"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const webpack_config_base_1 = require("./webpack.config.base");
const configRules_1 = require("./configRules");
const configPluginsWeb_1 = require("./configPluginsWeb");
class WebpackDevConfig extends webpack_config_base_1.WebpackBaseConfig {
    constructor(entry, output) {
        super(entry, output);
        this.resolve = {
            modules: ['node_modules', '.'],
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
        };
        this.module = {
            rules: configRules_1.configBaseRules()
        };
        this.devtool = '#source-map';
        this.plugins = configPluginsWeb_1.configPluginsWeb.concat(
        // new MiniCssExtractPlugin({
        //   filename: `./[name]/bundle.css`
        // }),
        new webpack_1.default.NamedModulesPlugin(), new webpack_1.default.HotModuleReplacementPlugin());
        this.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendors: false
                }
            }
        };
    }
}
exports.default = WebpackDevConfig;
