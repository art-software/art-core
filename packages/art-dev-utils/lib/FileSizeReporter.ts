import recursive from 'recursive-readdir';
import { sync } from 'gzip-size';
import { readFileSync } from 'fs';
import { Stats } from 'webpack';
import { join, basename, dirname, extname, sep } from 'path';
import filesize from 'filesize';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

function removeFileNameHash(buildFolder: string, fileName: string): string {
  return fileName
    .replace(buildFolder, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel(currentSize: number, previousSize: number) {
  const FIFTY_KILOBYTES = 1024 * 50;
  const difference = currentSize - previousSize;
  const fileSize = !Number.isNaN(difference) ? filesize(difference) : 0;
  if (difference >= FIFTY_KILOBYTES) {
    return chalk.red('+' + fileSize);
  } else if (difference < FIFTY_KILOBYTES && difference > 0) {
    return chalk.yellow('+' + fileSize);
  } else if (difference < 0) {
    return chalk.green(fileSize || '0');
  } else {
    return '';
  }
}

export interface FileSizeProps {
  root: string;
  size: object;
}

export function measureFileSizesBeforeBuild(buildFolder: string) {
  return new Promise<FileSizeProps>((resolve) => {
    recursive(buildFolder, (error, files) => {

      let size;
      if (!error && files.length) {
        size = files.filter((file) => /\.(js|css)$/.test(file))
          .reduce((prev, file) => {
            const contents = readFileSync(file);
            const key = removeFileNameHash(buildFolder, file);
            prev[key] = sync(contents);
            return prev;
          }, {});
      }

      resolve({
        root: buildFolder,
        size: size || {}
      });
    });
  });
}

export function printFileSizesAfterBuild(
  webpackStats: Stats,
  previousSizeMap: FileSizeProps,
  buildFolder: string,
  maxBundleGzipSize: number,
  maxChunkGzipSize: number
) {
  const root = previousSizeMap.root;
  const prevSize = previousSizeMap.size;
  const assets = (webpackStats
    .toJson()
    .assets || []).filter((asset) => /\.(js|css|png|jpg|gif)$/.test(asset.name.split('?')[0]))
    .map((asset) => {
      const assetName = asset.name.split('?')[0];
      const fileContents = readFileSync(join(root, assetName));
      const contentSize = sync(fileContents);
      const previousSize = prevSize[removeFileNameHash(root, assetName)];
      const difference = getDifferenceLabel(contentSize, previousSize);
      return {
        folder: join(basename(buildFolder), dirname(assetName)),
        name: basename(assetName),
        size: contentSize,
        sizeLabel: filesize(contentSize) + (difference ? ' (' + difference + ')' : ''),
      };
    });

  assets.sort((a, b) => b.size - a.size);

  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map((a) => stripAnsi(a.sizeLabel).length)
  );

  let suggestBundleSplitting = false;
  assets.forEach((asset) => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = stripAnsi(sizeLabel).length;
    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }
    const isMainBundle = asset.name.indexOf('main.') === 0;
    const maxRecommendedSize = isMainBundle
      ? maxBundleGzipSize
      : maxChunkGzipSize;
    const isLarge = maxRecommendedSize && asset.size > maxRecommendedSize;
    if (isLarge && extname(asset.name) === '.js') {
      suggestBundleSplitting = true;
    }
    console.log('➩ '
      + (isLarge ? chalk.yellow(sizeLabel) : sizeLabel) + '  '
      + chalk.dim(asset.folder + sep)
      + chalk.cyan(asset.name)
    );
  });

  if (suggestBundleSplitting) {
    console.log();
    console.log(
      chalk.yellow('The bundle size is significantly larger than recommended.')
    );
    console.log(
      chalk.yellow(
        'Consider reducing it with code splitting: https://goo.gl/9VhYWB'
      )
    );
    console.log(
      chalk.yellow(
        'You can also analyze the project dependencies: https://goo.gl/LeUzfb'
      )
    );
  }
}