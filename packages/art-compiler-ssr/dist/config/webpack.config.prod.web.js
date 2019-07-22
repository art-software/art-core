"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_config_base_web_1 = require("./webpack.config.base.web");
const uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const appConfig_1 = __importDefault(require("./appConfig"));
const webpack_plugin_chunkhash_output_1 = __importDefault(require("../plugins/webpack-plugin-chunkhash-output"));
const enableBundleHashName = appConfig_1.default.get('enableBundleHashName');
const version = appConfig_1.default.get('art:version');
const dllVersion = appConfig_1.default.get('art:webpack:dll:version') || 'default-version';
const virtualPath = appConfig_1.default.get('art:projectVirtualPath') || '';
// const outputPath = join(process.cwd(), './public', virtualPath, 'vendors', dllVersion);
// function bundleFileNamePattern(endFix: string = '.js'): string {
//   if (enableBundleHashName) {
//     return `bundle[chunkhash]${endFix}`;
//   }
//   return `bundle${endFix}?${version}`;
// }
class WebpackProdConfigWeb extends webpack_config_base_web_1.WebpackBaseConfigWeb {
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
        }), 
        // new MiniCssExtractPlugin({
        //   filename: `[name]/${bundleFileNamePattern('.css')}`
        // }),
        new mini_css_extract_plugin_1.default({
            filename: `./[name]/bundle.css`,
            chunkFilename: `${Object.keys(this.entry)[0]}/[id].[chunkhash].css`,
        }), new webpack_plugin_chunkhash_output_1.default({
            validateOutput: false,
            version,
            enableBundleHashName,
            validateOutputRegex: /bundle.*\.(js|css)/
        }));
    }
}
exports.default = WebpackProdConfigWeb;
