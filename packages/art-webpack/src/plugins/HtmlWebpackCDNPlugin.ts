import { Plugin } from 'webpack';
import { extend, includes } from 'lodash';
import * as url from 'url';
import * as path from 'path';

export default class HtmlWebpackCDNPlugin implements Plugin {

  public apply(compiler): void {
    compiler.hooks.compilation.tap('html-webpack-cdn-plugin', (compilation) => {
      // console.log('compilation.hooks: ', compilation.hooks);
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('html-webpack-cdn-plugin', (htmlPluginData, callback) => {
        const result = this.handleAssets(htmlPluginData);
        if (callback) {
          callback(null, result);
        }
      });
    });
  }

  public handleAssets(pluginData) {
    const htmlWebpackPluginOptions = pluginData.plugin.options;
    const { cdnPath } = htmlWebpackPluginOptions;
    const { head } = pluginData;
    const body: any[] = [];

    head.forEach((tag) => {
      const { tagName, attributes = {} } = tag;
      const { rel, href } = attributes;
      if (tagName === 'link' && rel === 'stylesheet') {
        extend(attributes, {
          href: cdnPath ? url.resolve(cdnPath, href.replace(cdnPath, '')) : path.basename(href)
        });
        if (!includes(head, tag)) { head.push(tag); }
      }
    });

    pluginData.body.forEach(function (tag) {
      const { tagName, attributes = {} } = tag;
      const { src } = attributes;
      if (tagName === 'script') {
        extend(attributes, {
          src: cdnPath ? url.resolve(cdnPath, src.replace(cdnPath, '')) : path.basename(src)
        });
        if (!includes(body, tag)) { body.push(tag); }
      }
    });

    return {
      head,
      body,
      plugin: pluginData.plugin,
      chunks: pluginData.chunks,
      outputName: pluginData.outputName
    };
  }

}