"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configRules_1 = require("./configRules");
const configPlugins_1 = require("./configPlugins");
const env_1 = require("../utils/env");
class WebpackBaseConfig {
    constructor(entry, output) {
        this.mode = env_1.isProd() ? 'production' : 'development';
        this.resolve = {
            modules: ['node_modules', '.'],
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
        };
        this.module = {
            rules: configRules_1.configBaseRules()
        };
        this.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendors: false
                }
            }
        };
        this.entry = entry;
        this.output = output;
        this.plugins = configPlugins_1.configBasePlugins(entry);
    }
}
exports.WebpackBaseConfig = WebpackBaseConfig;
