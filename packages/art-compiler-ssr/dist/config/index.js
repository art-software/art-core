"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const webpack_config_dev_web_1 = __importDefault(require("./webpack.config.dev.web"));
const webpack_config_dev_ssr_1 = __importDefault(require("./webpack.config.dev.ssr"));
const env_1 = require("../utils/env");
const webpack_config_prod_1 = __importDefault(require("./webpack.config.prod"));
exports.getWebpackConfigWeb = (moduleEntry) => {
    const entry = configWebpackModules_1.webpackEntries(moduleEntry, false);
    const hotEntry = configWebpackModules_1.attachHotDevServerScripts(entry);
    const output = configWebpackModules_1.webpackOutput(moduleEntry);
    if (!env_1.isProd()) {
        return new webpack_config_dev_web_1.default(hotEntry, output);
    }
    else {
        // TODO check it
        return new webpack_config_prod_1.default(entry, output);
    }
};
exports.getWebpackConfigSSR = (moduleEntry) => {
    const entry = configWebpackModules_1.webpackEntriesSSR(moduleEntry, false);
    const output = configWebpackModules_1.webpackOutputSSR(moduleEntry);
    if (!env_1.isProd()) {
        return new webpack_config_dev_ssr_1.default(entry, output);
    }
    else {
        // TODO check it
        return new webpack_config_prod_1.default(entry, output);
    }
};
