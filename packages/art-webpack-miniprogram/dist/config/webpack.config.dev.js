"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const webpack_config_base_1 = require("./webpack.config.base");
class WebpackDevConfig extends webpack_config_base_1.WebpackBaseConfig {
    constructor(entry, output) {
        super(entry, output);
        this.devtool = '#source-map';
        this.plugins = this.plugins.concat(new mini_css_extract_plugin_1.default({
            filename: `./[name]/bundle.css`
        }), new webpack_1.default.NamedModulesPlugin());
    }
}
exports.default = WebpackDevConfig;
