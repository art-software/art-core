"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./utils/Logger"));
const lifecycle_1 = require("./utils/lifecycle");
const Lifecycle_1 = require("./enums/Lifecycle");
const Signals_1 = require("./enums/Signals");
class Worker {
    constructor(app, config, workerId) {
        this.server = null;
        this.app = app;
        this.config = config;
        this.workerId = workerId;
        this.closing = false;
    }
    // protected attachMiddleware(app: Application, config: IServerConfig) {
    //   app.use(bodyParser.json(config.bodyParser));
    // }
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
                        Logger_1.default.info('Ran into error during close', { stack: err.stack });
                    }
                    resolve();
                });
            }
            catch (err) {
                Logger_1.default.info('Ran into error on close', { stack: err.stack });
                resolve();
            }
        });
    }
    exit(code) {
        return () => {
            return process.exit(code);
        };
    }
    shutDownSequence(error, request, code = 1) {
        if (error) {
            Logger_1.default.info(error.stack || '');
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
            Logger_1.default.info(`SSR worker got ${sig}. Going down`);
            this.shutDownSequence(undefined, undefined, 0);
        });
    }
    start() {
        // this.attachMiddleware(this.app, this.config);
        if (this.config.onServer) {
            this.config.onServer(this.app, process);
        }
        this.initServer(this.app, this.config, () => {
            if (process.send) {
                // tell our coordinator that we're ready to start receiving requests
                process.send({ workerId: this.workerId, ready: true });
            }
            Logger_1.default.info('Connected', { listen: [this.config.host, this.config.port] });
        });
        if (this.config.devMode) {
            [Signals_1.Termination.SIGTERM, Signals_1.Termination.SIGINT].forEach((sig) => {
                this.registerSignalHandler(sig);
            });
        }
    }
}
exports.Worker = Worker;
