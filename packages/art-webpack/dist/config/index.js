"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configWebpackModules_1 = require("./configWebpackModules");
const webpack_config_dev_1 = __importDefault(require("./webpack.config.dev"));
exports.getWebpackConfig = () => {
    const entry = configWebpackModules_1.attachHotDevServerScripts(configWebpackModules_1.webpackEntries(false));
    const output = configWebpackModules_1.webpackOutput();
    // if (!isProd()) {
    return new webpack_config_dev_1.default(entry, output);
    // }
};
