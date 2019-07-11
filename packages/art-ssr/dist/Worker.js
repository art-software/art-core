"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const lifecycle_1 = require("./utils/lifecycle");
const Lifecycle_1 = require("./enums/Lifecycle");
const logger_1 = __importDefault(require("./utils/logger"));
const Signals_1 = require("./enums/Signals");
const renderBatch_1 = require("./controllers/render/renderBatch");
class Worker {
    constructor(app, config, workerId) {
        this.server = null;
        this.app = app;
        this.config = config;
        this.workerId = workerId;
        this.closing = false;
    }
    attachMiddleware(app, config) {
        app.use(body_parser_1.default.json(config.bodyParser));
    }
    attachEndpoint(app, config, callback) {
        app.post(config.endpoint, renderBatch_1.renderBatch(config, callback));
    }
    exit(code) {
        return () => {
            return process.exit(code);
        };
    }
    // close server
    close(server) {
        return new Promise((resolve) => {
            if (!server) {
                resolve();
                return;
            }
            try {
                this.closing = true;
                server.close((err) => {
                    if (err) {
                        logger_1.default.info('Ran into error during close', { stack: err.stack });
                    }
                    resolve();
                });
            }
            catch (err) {
                logger_1.default.info('Ran into error on close', { stack: err.stack });
                resolve();
            }
        });
    }
    shutDownSequence(error, request, code = 1) {
        if (error) {
            logger_1.default.info(error.stack || '');
        }
        if (!this.server) {
            return;
        }
        lifecycle_1.raceTo(this.close(this.server), 1000, 'Closing the worker took too long.')
            .then(() => {
            return lifecycle_1.runAppLifecycle(Lifecycle_1.Lifecycle.shutDown, this.config, error, request);
        })
            .then(this.exit(code))
            .catch(this.exit(code));
    }
    initServer(app, config, callback) {
        process.on('message', (message) => {
            if (message === 'kill') {
                this.shutDownSequence();
            }
        });
        lifecycle_1.runAppLifecycle(Lifecycle_1.Lifecycle.initialize, config)
            .then(() => {
            this.server = app.listen(config.port, config.host, callback);
            return null;
        })
            .catch(this.shutDownSequence);
    }
    registerSignalHandler(sig) {
        process.on(sig, () => {
            logger_1.default.info(`SSR worker got ${sig}. Going down`);
            this.shutDownSequence(undefined, undefined, 0);
        });
    }
    start() {
        this.attachMiddleware(this.app, this.config);
        if (this.config.onServer) {
            this.config.onServer(this.app, process);
        }
        this.initServer(this.app, this.config, () => {
            if (process.send) {
                // tell our coordinator that we're ready to start receiving requests
                process.send({ workerId: this.workerId, ready: true });
            }
            logger_1.default.info('Connected', { listen: [this.config.host, this.config.port] });
        });
        this.attachEndpoint(this.app, this.config, () => {
            return this.server && this.closing;
        });
        // Gracefully shutdown the worker when not running in a cluster (devMode = true)
        if (this.config.devMode) {
            [Signals_1.Termination.SIGTERM, Signals_1.Termination.SIGINT].forEach((signal) => {
                this.registerSignalHandler(signal);
            });
        }
    }
}
exports.Worker = Worker;
