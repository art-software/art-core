"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const env_1 = require("../utils/env");
const webpack_config_dev_web_1 = __importDefault(require("./webpack.config.dev.web"));
const webpack_config_prod_web_1 = __importDefault(require("./webpack.config.prod.web"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const webpackConfigWeb = (moduleEntry) => {
    const entry = configWebpackModules_1.webpackEntries(moduleEntry, false);
    const hotEntry = configWebpackModules_1.attachHotDevServerScripts(entry);
    const output = configWebpackModules_1.webpackOutput(moduleEntry);
    if (!env_1.isProd()) {
        return new webpack_config_dev_web_1.default(hotEntry, output);
    }
    else {
        // TODO check it
        return new webpack_config_prod_web_1.default(entry, output);
    }
};
const argv = process.argv;
const ART_MODULES = JSON.parse(argv[argv.indexOf('--ART_MODULES') + 1] || appConfig_1.default.get('ART_MODULES'));
const getWebpackConfigWeb = () => {
    return ART_MODULES.map((moduleEntry) => {
        const webpackConfig = webpackConfigWeb(moduleEntry);
        return webpackConfig;
    });
};
exports.default = getWebpackConfigWeb;
