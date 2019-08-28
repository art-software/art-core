"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const path_1 = require("path");
const ServerConfig_1 = require("./config/ServerConfig");
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const Worker_1 = require("./Worker");
const cluster_1 = __importDefault(require("cluster"));
const Coordinator_1 = __importDefault(require("./Coordinator"));
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
    createApplication
};
function createApplication() {
    return express_1.default();
}
class RenderServer {
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        ServerConfig_1.ServerConfig.set(this.config);
        this.app = express_1.default();
    }
    initApplication() {
        this.app.use(body_parser_1.default.json(this.config.bodyParser));
        this.app.use(compression_1.default());
        routing_controllers_1.useExpressServer(this.app, {
            controllers: [path_1.join(__dirname, './controllers/render/RenderController.js')]
        });
    }
    start() {
        this.initApplication();
        if (this.config.devMode) {
            const worker = new Worker_1.Worker(this.app, this.config);
            worker.start();
        }
        else if (cluster_1.default.isMaster) {
            const coordinator = new Coordinator_1.default();
            coordinator.start();
        }
        else {
            const worker = new Worker_1.Worker(this.app, this.config, cluster_1.default.worker.id);
            worker.start();
        }
    }
}
exports.default = RenderServer;
