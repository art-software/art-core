"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = __importDefault(require("./paths"));
const webpack_serve_1 = __importDefault(require("webpack-serve"));
const envName = process.env.NODE_ENV || 'development';
const webpackServe = (compiler, callback) => {
    const argv = {};
    const serveOptions = {
        compiler,
        content: paths_1.default.appPublic,
        // host: appConfig.get(`devHost:${ envName }`),
        host: 'http://127.0.0.1',
        hotClient: {
            // host: appConfig.get(`devHost:${ envName }`),
            host: 'http://127.0.0.1',
            // port: appConfig.get(`devPort:${ envName }`)
            port: 3000,
            autoConfigure: false
        },
        // port: appConfig.get(`devPort:${ envName }`),
        port: 3000,
        logLevel: 'warn'
    };
    return webpack_serve_1.default(argv, serveOptions).then(callback);
};
exports.default = webpackServe;
