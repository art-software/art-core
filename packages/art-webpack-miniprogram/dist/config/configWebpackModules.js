"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const miniprogramWebpackEntry_1 = require("./miniprogramWebpackEntry");
const env_1 = require("../utils/env");
const paths_1 = __importDefault(require("./paths"));
const appConfig_1 = __importDefault(require("./appConfig"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const envName = appConfig_1.default.get('NODE_ENV');
const isProdEnv = env_1.isProd();
exports.webpackEntries = () => {
    return miniprogramWebpackEntry_1.miniprogramWebpackEntry().entry;
};
exports.webpackOutput = () => {
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false);
    const port = appConfig_1.default.get(`devPort:${envName}`);
    const output = appConfig_1.default.get(`art:webpack:output`) || {};
    const publicPath = isProdEnv ? output[`${appConfig_1.default.get('BUILD_ENV')}PublicPath`] : `${host}:${port}/public/`;
    return {
        filename: `[name]`,
        chunkFilename: `_chunks/[id].[chunkhash].js`,
        path: isProdEnv ? paths_1.default.appPublic : paths_1.default.appDebug,
        publicPath
    };
};
