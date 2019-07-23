import { Tapable } from 'tapable';
import { Compiler } from 'webpack';
import crypto from 'crypto';
import { readFileSync } from 'fs';

export default class OutputHash implements Tapable.Plugin {
  constructor({
    validateOutput = false,
    validateOutputRegex = /bundle.*\.(js|css)/,
    hashDigestLength = 0,
    version = '',
    enableBundleHashName = false
  } = {}) {
    this.validateOutput = validateOutput;
    this.validateOutputRegex = validateOutputRegex;
    this.hashDigestLength = hashDigestLength;
    this.version = version;
    this.enableBundleHashName = enableBundleHashName;
  }

  public validateOutput: boolean;
  public validateOutputRegex: RegExp;
  public hashDigestLength: number;
  public version: string;
  public enableBundleHashName: boolean;
  public chunkGroups: any[];

  public apply(compiler: Compiler): void {
    let hashFn;
    compiler.hooks.compilation.tap('OutputHash', (compilation) => {
      const {
        hashFunction,
        hashDigest,
        hashDigestLength,
        hashSalt
      } = compilation.outputOptions;

      // Reuses webpack options
      hashFn = (input) => {
        const hashObj = crypto.createHash(hashFunction).update(input);
        if (hashSalt) {
          hashObj.update(hashSalt);
        }
        const fullHash = hashObj.digest(hashDigest);
        return { fullHash, shortHash: fullHash.substr(0, this.hashDigestLength || hashDigestLength) };
      };

      // Webpack does not pass chunks and assets to any compilation step, but we need both.
      // To get them, we hook into 'optimize-chunk-assets' and save the chunks for processing
      // them later.
      compilation.hooks.afterOptimizeChunks.tap('Capture chunks', (chunlk, chunkGroups) => {
        this.chunkGroups = chunkGroups;
      });

      compilation.hooks.afterOptimizeAssets.tap('Update chunks', (assets) => {
        const sortedChunks: any[] = [];
        const visitedGroups: any[] = [];

        const extractInOrder = (group) => {
          // Mark the group as processed
          visitedGroups.push(group);

          // For each child group, process it if it hasn't been processed before
          group.getChildren().forEach((child) => {
            if (!visitedGroups.includes(child)) {
              extractInOrder(child);
            }
          });

          // For each chunk in this group
          //   - Get all groups containing that chunk (that includes this group)
          //   - If the group hasn't been processed yet, process it (this will skip current
          //     group)
          //   - After all groups containing the chunk have been processed, add the chunk to
          //     the list of sortedChunks
          group.chunks.forEach((chunk) => {
            Array.from(chunk.groupsIterable).forEach((parentGroup) => {
              if (!visitedGroups.includes(parentGroup)) { extractInOrder(parentGroup); }
            });
            if (!sortedChunks.includes(chunk)) { sortedChunks.push(chunk); }
          });
        };

        this.chunkGroups.forEach(extractInOrder);
        sortedChunks.forEach((chunk) => {
          this.reHashChunk.call(this, chunk, assets, hashFn);
        });
      });
    });

    if (this.validateOutput) {
      compiler.hooks.afterEmit.tapAsync('Validate output', (compilation, callback) => {
        let err;
        const machedAssets = Object.keys(compilation.assets)
          .filter((assetName) => assetName.match(this.validateOutputRegex));

        const matchedAssetContent = machedAssets.map((assetName) => {
          const asset = compilation.assets[assetName];
          const path = asset.existsAt;
          return readFileSync(path, 'utf8');
        });

        const { shortHash } = hashFn(matchedAssetContent.join(''));
        machedAssets.forEach((assetName) => {
          if (!assetName.includes(shortHash)) {
            err = new Error(`The hash in ${assetName} does not match the hash of the content (${shortHash})`);
          }
        });
        return callback(err);
      });
    }
  }

  /**
   * Computes the new hash of a chunk by chunk.files that matched .(js|css)
   *
   * We assume that the content of bundle.css, bundle.js don't need `chunkhash` variable 
   * We only need to caculate the `newHash` of the concat content of (bundle.js + bundle.css) and
   * replace the corresponding pathname of chunk.files[] and assets key.
   * 
   */
  private reHashChunk(chunk, assets, hashFn) {
    const oldHash = chunk.renderedHash;
    const chunkJsCssFiles = chunk.files.filter((file) => file.match(this.validateOutputRegex));

    const chunkJsCssFileContent = chunkJsCssFiles.map((chunkFileName) => {
      const asset = assets[chunkFileName];
      return this.concatContentInAsset(asset, '');
    });

    const { fullHash, shortHash } = hashFn(chunkJsCssFileContent.join(''));

    // Update new chunk hash.
    chunk.hash = fullHash;
    chunk.renderedHash = shortHash;

    chunkJsCssFiles.forEach((oldChunkName) => {
      let newChunkName = oldChunkName.replace(oldHash, shortHash);
      if (this.version) {
        newChunkName = newChunkName.split('?')[0] + '?' + this.version;
      }
      const chunkFileLen = chunk.files.length;
      for (let i = 0; i < chunkFileLen; i++) {
        if (chunk.files[i] === oldChunkName) {
          chunk.files[i] = newChunkName;
        }
      }
      const asset = assets[oldChunkName];

      // Update the asset associated with that file
      asset._name = newChunkName;
      delete assets[oldChunkName];
      assets[newChunkName] = asset;
    });
  }

  private concatContentInAsset(asset: any, resultContent: any) {
    if (!asset) {
      return resultContent;
    }

    if (typeof asset === 'string') {
      return asset + resultContent;
    }

    // CachedSource
    if ('_cachedSource' in asset) {
      return resultContent + asset.source();
    }

    // RawSource / SourceMapSource
    if ('_value' in asset) {
      return resultContent + asset.source();
    }

    // ReplaceSource
    if ('_source' in asset) {
      return this.concatContentInAsset(asset._source, resultContent);
    }

    // ConcatSource
    if ('children' in asset) {
      const temp: any[] = [];
      asset.children.forEach((child, index) => {
        temp.push(this.concatContentInAsset(child, resultContent));
      });
      return temp.join('');
    }

    throw new Error(`Unknown asset type (${asset.constructor.name})!. ` +
      'Unfortunately this type of asset is not supported yet. ' +
      'Please raise an issue and we will look into it asap');
  }
}