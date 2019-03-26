"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtimeEnv_1 = require("../utils/runtimeEnv");
// TODO optimize it later
let appConfig;
if (runtimeEnv_1.isWxMiniprogramEnv) {
    appConfig = require('../../../art-webpack-miniprogram/dist/config/appConfig.js');
}
else {
    appConfig = require('../../../art-webpack/dist/config/appConfig.js');
}
module.exports = appConfig.default;
