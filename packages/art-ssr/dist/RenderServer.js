"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const Coordinator_1 = require("./Coordinator");
const Worker_1 = require("./Worker");
function createApplication() {
    return express_1.default();
}
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
class RenderServer {
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        console.log('init server');
        // TODO
        // init logger
        // Logger.init(this.config.logger, this.config.loggerInstance);
    }
    createApp() {
        const app = this.config.createApplication();
        return app;
    }
    start() {
        // create an express app
        const app = this.createApp();
        if (this.config.devMode) {
            const worker = new Worker_1.Worker(app, this.config);
            worker.start();
        }
        else if (cluster_1.default.isMaster) {
            const coordinator = new Coordinator_1.Coordinator();
            console.log('coordinator');
            coordinator.start();
        }
        else {
            console.log('worker');
            const worker = new Worker_1.Worker(app, this.config, cluster_1.default.worker.id);
            worker.start();
        }
    }
}
exports.default = RenderServer;
