"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const url = __importStar(require("url"));
const path = __importStar(require("path"));
class HtmlWebpackCDNPlugin {
    apply(compiler) {
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
    handleAssets(pluginData) {
        const htmlWebpackPluginOptions = pluginData.plugin.options;
        const { cdnPath } = htmlWebpackPluginOptions;
        const { head } = pluginData;
        const body = [];
        head.forEach((tag) => {
            const { tagName, attributes = {} } = tag;
            const { rel, href } = attributes;
            if (tagName === 'link' && rel === 'stylesheet') {
                lodash_1.extend(attributes, {
                    href: cdnPath ? url.resolve(cdnPath, href.replace(cdnPath, '')) : path.basename(href)
                });
                if (!lodash_1.includes(head, tag)) {
                    head.push(tag);
                }
            }
        });
        pluginData.body.forEach(function (tag) {
            const { tagName, attributes = {} } = tag;
            const { src } = attributes;
            if (tagName === 'script') {
                lodash_1.extend(attributes, {
                    src: cdnPath ? url.resolve(cdnPath, src.replace(cdnPath, '')) : path.basename(src)
                });
                if (!lodash_1.includes(body, tag)) {
                    body.push(tag);
                }
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
exports.default = HtmlWebpackCDNPlugin;
