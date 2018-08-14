"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_config_dev_1 = require("./webpack.config.dev");
const paths_1 = __importDefault(require("./paths"));
const appConfig_1 = __importDefault(require("./appConfig"));
const serveOptions = {
    compiler: new webpack_config_dev_1.WebpackDevConfig('client'),
    content: paths_1.default.appPublic,
    host: appConfig_1.default.get(`devHost:${process.env.NODE_ENV || 'development'}`),
    hotClient: true,
    port: appConfig_1.default.get(`devPort:${process.env.NODE_ENV || 'development'}`)
};
