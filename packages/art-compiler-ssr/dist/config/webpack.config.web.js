"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const argv = process.argv;
const ART_MODULES = JSON.parse(argv[argv.indexOf('--ART_MODULES') + 1]);
const config = ART_MODULES.map((moduleEntry) => {
    const webpackConfig = index_1.getWebpackConfigWeb(moduleEntry);
    return webpackConfig;
});
exports.default = config;
