"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_config_base_ssr_1 = require("./webpack.config.base.ssr");
// import { getConfigPluginsSSR } from './configPluginsSSR';
class WebpackDevSSRConfig extends webpack_config_base_ssr_1.WebpackBaseConfigSSR {
    constructor(entry, output) {
        super(entry, output);
        this.devtool = '#source-map';
    }
}
exports.default = WebpackDevSSRConfig;
