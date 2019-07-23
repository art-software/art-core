import { isSSRProject } from '../utils/runtimeEnv';

// TODO optimize it later
let appConfig;
if (isSSRProject) {
  appConfig = require('../../../art-compiler-ssr/dist/config/appConfig.js');
} else {
  appConfig = require('../../../art-webpack/dist/config/appConfig.js');
}

module.exports = appConfig.default;