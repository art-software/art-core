"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const path_1 = __importDefault(require("path"));
const ServerConfig_1 = require("./config/ServerConfig");
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
    // constructor(config: Partial<ServerConfig> & { getComponent: any }) {
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        routing_controllers_1.useContainer(typedi_1.Container);
        ServerConfig_1.ServerConfig.set(this.config);
    }
    initApplication() {
        const app = routing_controllers_1.createExpressServer({
            controllers: [path_1.default.join(__dirname, './controllers/render/RenderController.js')]
        });
        return app;
    }
    start() {
        const app = this.initApplication();
        app.listen(this.config.port);
    }
}
exports.default = RenderServer;
