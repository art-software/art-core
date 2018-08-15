"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = __importDefault(require("./paths"));
const appConfig_1 = __importDefault(require("./appConfig"));
const webpack_serve_1 = __importDefault(require("webpack-serve"));
const envName = process.env.NODE_ENV || 'development';
const webpackServe = (compiler, callback) => {
    const argv = {};
    const serveOptions = {
        compiler,
        content: paths_1.default.appPublic,
        logLevel: 'error',
        // host: appConfig.get(`devHost:${envName}`),
        port: appConfig_1.default.get(`devPort:${envName}`)
    };
    return webpack_serve_1.default(argv, serveOptions).then(callback);
};
exports.default = webpackServe;
