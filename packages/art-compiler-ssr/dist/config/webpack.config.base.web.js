"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../utils/env");
const configRules_1 = require("./configRules");
const configPluginsWeb_1 = require("./configPluginsWeb");
class WebpackBaseConfigWeb {
    constructor(entry, output) {
        this.stats = 'errors-only';
        this.resolve = {
            modules: ['node_modules', '.'],
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html', '.less', '.css']
        };
        this.module = {
            rules: configRules_1.configBaseRules()
        };
        this.plugins = configPluginsWeb_1.getConfigPluginsWeb();
        this.mode = env_1.isProd() ? 'production' : 'development';
        this.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendors: false
                }
            }
        };
        this.entry = entry;
        this.output = output;
    }
}
exports.WebpackBaseConfigWeb = WebpackBaseConfigWeb;
