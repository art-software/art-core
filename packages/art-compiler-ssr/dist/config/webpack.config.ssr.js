"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const env_1 = require("../utils/env");
const webpack_config_dev_ssr_1 = __importDefault(require("./webpack.config.dev.ssr"));
const webpack_config_prod_ssr_1 = __importDefault(require("./webpack.config.prod.ssr"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const getWebpackConfigSSR = (moduleEntry) => {
    const entry = configWebpackModules_1.webpackEntriesSSR(moduleEntry, false);
    const output = configWebpackModules_1.webpackOutputSSR(moduleEntry);
    if (!env_1.isProd()) {
        return new webpack_config_dev_ssr_1.default(entry, output);
    }
    else {
        // TODO check it
        return new webpack_config_prod_ssr_1.default(entry, output);
    }
};
const argv = process.argv;
const ART_MODULES = JSON.parse(argv[argv.indexOf('--ART_MODULES') + 1] || appConfig_1.default.get('ART_MODULES'));
console.log('ART_MODULES: ', ART_MODULES);
const webpackConfigSSR = ART_MODULES.map((moduleEntry) => {
    const webpackConfig = getWebpackConfigSSR(moduleEntry);
    return webpackConfig;
});
exports.default = webpackConfigSSR;
