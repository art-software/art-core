"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../utils/env");
const configRules_1 = require("./configRules");
const configPluginsSSR_1 = require("./configPluginsSSR");
class WebpackBaseConfigSSR {
    constructor(entry, output) {
        this.target = 'node';
        this.stats = 'errors-only';
        this.resolve = {
            modules: ['node_modules', '.'],
            extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less', '.css']
        };
        this.module = {
            rules: [configRules_1.jsRule, configRules_1.tsRule, configRules_1.cssRule(env_1.isProd(), true), configRules_1.lessRule(env_1.isProd(), true), configRules_1.sassRule(env_1.isProd(), true),
                configRules_1.nullRule, configRules_1.htmlRule, configRules_1.assetsRuleSSR()]
        };
        this.mode = env_1.isProd() ? 'production' : 'development';
        this.plugins = configPluginsSSR_1.getConfigPluginsSSR();
        this.entry = entry;
        this.output = output;
    }
}
exports.WebpackBaseConfigSSR = WebpackBaseConfigSSR;
