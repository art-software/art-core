"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const Logger_1 = __importDefault(require("./utils/Logger"));
const lifecycle_1 = require("./utils/lifecycle");
const Signals_1 = require("./enums/Signals");
class Coordinator {
    getWorkerCount() {
        const logicCpus = os_1.default.cpus().length;
        const workersCount = logicCpus - 1;
        return workersCount;
    }
    workersReady(workerCount) {
        const workers = Object.values(cluster_1.default.workers);
        return workers.length === workerCount && workers.every((worker) => {
            return worker && worker.isReady;
        });
    }
    close() {
        return Promise.all(Object.values(cluster_1.default.workers).map((worker) => {
            const promise = new Promise((resolve, reject) => {
                if (!worker) {
                    reject();
                    return;
                }
                worker.once('disconnect', resolve);
                worker.on('exit', (code) => {
                    if (code !== 0) {
                        reject();
                    }
                });
                if (worker) {
                    worker.send('kill');
                }
                return promise;
            });
        }));
    }
    kill(signal) {
        const liveWorkers = Object.values(cluster_1.default.workers)
            .filter((worker) => {
            return !worker.isDead();
        });
        if (liveWorkers.length > 0) {
            Logger_1.default.info(`Coordinator killing ${liveWorkers.length} live workers with ${signal}`);
            return Promise.all(liveWorkers.map((worker) => {
                const promise = new Promise((resolve) => {
                    worker.once('exit', () => { resolve(); });
                });
                worker.process.kill(signal);
                return promise;
            }));
        }
        return Promise.resolve();
    }
    killSequence(signal) {
        return () => {
            return lifecycle_1.raceTo(this.kill(signal), 2000, `Killing workers with ${signal} took too long`);
        };
    }
    shutdown() {
        return lifecycle_1.raceTo(this.close(), 5000, 'Closing the coordinator took too long.')
            .then(this.killSequence(Signals_1.Termination.SIGTERM), this.killSequence(Signals_1.Termination.SIGTERM))
            .then(this.killSequence(Signals_1.Termination.SIGKILL), this.killSequence(Signals_1.Termination.SIGKILL));
    }
    start() {
        const workersCount = this.getWorkerCount();
        let isClosing = false;
        const onWorkerMessage = (msg) => {
            if (msg.ready) {
                // @ts-ignore
                cluster_1.default.workers[msg.workerId].isReady = true;
            }
            if (this.workersReady(workersCount)) {
                Object.values(cluster_1.default.workers).forEach((worker) => {
                    return worker && worker.send('healthy');
                });
            }
        };
        cluster_1.default.on('online', (worker) => {
            Logger_1.default.info(`Worker #${worker.id} is now online`);
        });
        cluster_1.default.on('listening', (worker, address) => {
            Logger_1.default.info(`Worker #${worker.id} is now connected to ${address.address}:${address.port}`);
        });
        cluster_1.default.on('disconnect', (worker) => {
            Logger_1.default.info(`Worker #${worker.id} has disconnected`);
        });
        cluster_1.default.on('exit', (worker, code, signal) => {
            if (worker.exitedAfterDisconnect === true || code === 0) {
                Logger_1.default.info(`Worker #${worker.id} shutting down.`);
            }
            else if (isClosing) {
                Logger_1.default.error(`Worker #${worker.id} died with code ${signal || code} during close. Not restarting.`);
            }
            else {
                // if worker died, re-fork a new one
                Logger_1.default.error(`Worker #${worker.id} died with code ${signal || code}. Restarting worker.`);
                const newWorker = cluster_1.default.fork();
                newWorker.on('message', onWorkerMessage);
            }
        });
        process.on(Signals_1.Termination.SIGTERM, () => {
            Logger_1.default.info('SSR render server got SIGTERM. Going down.');
            isClosing = true;
            this.shutdown()
                .then(() => {
                return process.exit(0), () => { return process.exit(1); };
            });
        });
        process.on(Signals_1.Termination.SIGINT, () => {
            isClosing = true;
            this.shutdown()
                .then(() => {
                return process.exit(0), () => { return process.exit(1); };
            });
        });
        // fork workers
        Array.from({ length: workersCount }, () => {
            return cluster_1.default.fork();
        });
        Object.values(cluster_1.default.workers)
            .forEach((worker) => {
            worker.on('message', onWorkerMessage);
        });
    }
}
exports.default = Coordinator;
