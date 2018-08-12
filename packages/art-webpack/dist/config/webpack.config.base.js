"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configRules_1 = require("./configRules");
const configPlugins_1 = require("./configPlugins");
class WebpackBaseConfig {
    constructor(entry) {
        this.isProd = process.env.NODE_ENV === 'production';
        this.mode = this.isProd ? 'production' : 'development';
        this.entry = [];
        this.resolve = {
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
        };
        this.module = {
            rules: configRules_1.configBaseRules()
        };
        this.plugins = configPlugins_1.configBasePlugins;
        this.entryModules = entry;
    }
}
exports.WebpackBaseConfig = WebpackBaseConfig;
