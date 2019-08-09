"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const path_1 = require("path");
const ServerConfig_1 = require("./config/ServerConfig");
const body_parser_1 = __importDefault(require("body-parser"));
const defaultConfig = {
    bodyParser: {
        limit: 1024 * 1000,
    },
    devMode: false,
    endpoint: '/batch',
    files: [],
    logger: {},
    plugins: [],
    port: 8080,
    host: '0.0.0.0',
    processJobsConcurrent: true,
};
class RenderServer {
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        routing_controllers_1.useContainer(typedi_1.Container);
        ServerConfig_1.ServerConfig.set(this.config);
        this.app = express_1.default();
    }
    initApplication() {
        this.app.use(body_parser_1.default.json(this.config.bodyParser));
        routing_controllers_1.useExpressServer(this.app, {
            controllers: [path_1.join(__dirname, './controllers/render/RenderController.js')]
        });
    }
    start() {
        this.initApplication();
        this.app.listen(this.config.port, () => {
            console.log('Server is listening on port: ', this.config.port);
        });
    }
}
exports.default = RenderServer;
