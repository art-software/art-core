"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const webpack_config_dev_1 = __importDefault(require("./webpack.config.dev"));
const env_1 = require("../utils/env");
const webpack_config_prod_1 = __importDefault(require("./webpack.config.prod"));
exports.getWebpackConfig = () => {
    const entry = configWebpackModules_1.webpackEntries(false);
    const hotEntry = configWebpackModules_1.attachHotDevServerScripts(entry);
    const output = configWebpackModules_1.webpackOutput();
    if (!env_1.isProd()) {
        return new webpack_config_dev_1.default(hotEntry, output);
    }
    else {
        const config = new webpack_config_prod_1.default(entry, output);
        console.log(JSON.stringify(config));
        return new webpack_config_prod_1.default(entry, output);
    }
};
