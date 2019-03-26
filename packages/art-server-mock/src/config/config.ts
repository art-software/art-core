import { isWxMiniprogramEnv } from '../utils/runtimeEnv';

// TODO optimize it later
let appConfig;
if (isWxMiniprogramEnv) {
  appConfig = require('../../../art-webpack-miniprogram/dist/config/appConfig.js');
} else {
  appConfig = require('../../../art-webpack/dist/config/appConfig.js');
}

module.exports = appConfig.default;