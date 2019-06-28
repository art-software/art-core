"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const htmlparser2_1 = __importDefault(require("htmlparser2"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
class HtmlWebpackChunksPlugin {
    constructor(options) {
        this.htmlWebpackChunksPluginGenerateAssetsManifest = (htmlPluginData, callback) => {
            const htmlSource = htmlPluginData.html.source();
            const resources = [];
            const parser = new htmlparser2_1.default.Parser({
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
            const manifestFileName = path_1.join(manifestPath, 'assets.manifest.json');
            fs_extra_1.default.outputJson(manifestFileName, resources, { spaces: 2 }, (err) => {
                if (err) {
                    throw err;
                }
                console.log();
                console.log(`Template html assets manifest file has been written to ${chalk_1.default.green(manifestFileName)}`);
            });
            callback(null, htmlPluginData);
        };
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlWebpackChunksPlugin', (compilation) => {
            if (compilation.hooks.htmlWebpackPluginAfterEmit) {
                compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('HtmlWebpackChunksPluginGenerateAssetsManifest', this.htmlWebpackChunksPluginGenerateAssetsManifest);
            }
        });
    }
}
exports.HtmlWebpackChunksPlugin = HtmlWebpackChunksPlugin;
