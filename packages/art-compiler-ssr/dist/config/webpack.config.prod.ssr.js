"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import webpack from 'webpack';
const webpack_config_base_ssr_1 = require("./webpack.config.base.ssr");
const uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import appConfig from './appConfig';
// import ChunkHashOutputPlugin from '../plugins/webpack-plugin-chunkhash-output';
// import paths from './paths';
// import { join } from 'path';
// const enableBundleHashName = appConfig.get('enableBundleHashName');
// const version = appConfig.get('art:version');
// const dllVersion = appConfig.get('art:webpack:dll:version') || 'default-version';
// const virtualPath = appConfig.get('art:projectVirtualPath') || '';
// const outputPath = join(process.cwd(), './public', virtualPath, 'vendors', dllVersion);
// function bundleFileNamePattern(endFix: string = '.js'): string {
//   if (enableBundleHashName) {
//     return `bundle[chunkhash]${endFix}`;
//   }
//   return `bundle${endFix}?${version}`;
// }
class WebpackProdConfigSSR extends webpack_config_base_ssr_1.WebpackBaseConfigSSR {
    constructor(entry, output) {
        super(entry, output);
        this.plugins = this.plugins.concat(
        // new webpack.DllReferencePlugin({
        //   context: join(paths.appCwd),
        //   manifest: join(outputPath, 'manifest.json')
        // }),
        new uglifyjs_webpack_plugin_1.default({
            cache: true,
            parallel: true,
            // set to true if you want JS source maps
            sourceMap: false,
            uglifyOptions: {
                compress: {
                    warnings: true,
                    dead_code: true,
                    drop_debugger: true,
                    drop_console: true
                }
            }
        }), new optimize_css_assets_webpack_plugin_1.default({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { 'postcss-discard-unused': false }
        }));
    }
}
exports.default = WebpackProdConfigSSR;
