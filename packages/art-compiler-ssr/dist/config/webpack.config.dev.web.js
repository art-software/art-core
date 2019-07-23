"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_config_base_web_1 = require("./webpack.config.base.web");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
class WebpackDevConfigWeb extends webpack_config_base_web_1.WebpackBaseConfigWeb {
    constructor(entry, output) {
        super(entry, output);
        // public resolve = {
        //   modules: ['node_modules', '.'],
        //   extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
        // };
        // public module = {
        //   rules: configBaseRules()
        // };
        this.devtool = '#source-map';
        this.plugins = this.plugins.concat(new mini_css_extract_plugin_1.default({
            filename: `./[name]/bundle.css`,
            chunkFilename: `${Object.keys(this.entry)[0]}/[id].[chunkhash].css`,
        }), new webpack_1.default.NamedModulesPlugin(), new webpack_1.default.HotModuleReplacementPlugin());
    }
}
exports.default = WebpackDevConfigWeb;
