import htmlparser from 'htmlparser2';
import fs from 'fs-extra';
import { join } from 'path';
import chalk from 'chalk';

interface IOptions {
  manifestPath: string;
}

export class HtmlWebpackChunksPlugin {
  constructor(options: IOptions) {
    this.options = options;
  }

  public options: IOptions;

  public apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackChunksPlugin', (compilation) => {
      if (compilation.hooks.htmlWebpackPluginAfterEmit) {
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('HtmlWebpackChunksPluginGenerateAssetsManifest',
          this.htmlWebpackChunksPluginGenerateAssetsManifest
        );
      }
    });
  }

  private htmlWebpackChunksPluginGenerateAssetsManifest = (htmlPluginData, callback) => {

    const htmlSource = htmlPluginData.html.source();

    const resources: Array<{ url: string, priority: string | undefined }> = [];

    const parser = new htmlparser.Parser({
      onopentag: (name, attribs) => {
        if (name === 'script' && attribs.src) {
          const { defer } = attribs;
          resources.push({
            url: attribs.src,
            priority: defer || null
          });
        }
        if (name === 'link' && attribs.href) {
          const { preload } = attribs;
          resources.push({
            url: attribs.href,
            priority: preload || null
          });
        }
      }
    }, {});

    parser.write(htmlSource);
    parser.end();

    const { manifestPath } = this.options;
    const manifestFileName = join(manifestPath, 'assets.manifest.json');

    fs.outputJson(manifestFileName, resources, { spaces: 2 }, (err) => {
      if (err) { throw err; }
      console.log();
      console.log(`Template html assets manifest file has been written to ${chalk.green(manifestFileName)}`);
    });
    callback(null, htmlPluginData);
  }
}