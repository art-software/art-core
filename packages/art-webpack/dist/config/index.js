"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const webpack_config_dev_1 = __importDefault(require("./webpack.config.dev"));
const env_1 = require("../utils/env");
const webpack_config_prod_1 = __importDefault(require("./webpack.config.prod"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const webpackConfig = (moduleEntry) => {
    const entry = configWebpackModules_1.webpackEntries(moduleEntry, false);
    const hotEntry = configWebpackModules_1.attachHotDevServerScripts(entry);
    const output = configWebpackModules_1.webpackOutput(moduleEntry);
    if (!env_1.isProd()) {
        return new webpack_config_dev_1.default(hotEntry, output);
    }
    else {
        return new webpack_config_prod_1.default(entry, output);
    }
};
const argv = process.argv;
const ART_MODULES = JSON.parse(argv[argv.indexOf('--ART_MODULES') + 1] || appConfig_1.default.get('ART_MODULES'));
exports.getWebpackConfig = () => {
    return ART_MODULES.map((moduleEntry) => {
        return webpackConfig(moduleEntry);
    });
};
