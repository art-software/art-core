"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const BatchManager_1 = __importDefault(require("./BatchManager"));
const lifecycle_1 = require("../../utils/lifecycle");
const Lifecycle_1 = require("../../enums/Lifecycle");
/**
 * Runs through the job-level lifecycle events of the job based on the provided token. This includes
 * the actual rendering of the job.
 *
 * Returns a promise resolving when the job completes.
 */
const processJob = (token, plugins, manager) => {
    return (lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.jobStart, plugins, manager, token)
        .then(() => {
        lifecycle_1.runLifecycleSync(Lifecycle_1.Lifecycle.beforeRender, plugins, manager, token);
        return manager.render(token);
    })
        .then(() => {
        lifecycle_1.runLifecycleSync(Lifecycle_1.Lifecycle.afterRender, plugins, manager, token);
        return lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.jobEnd, plugins, manager, token);
    })
        .catch((err) => {
        manager.recordError(err, token);
        lifecycle_1.errorSync(err, plugins, manager, token);
    }));
};
const processJobsSerially = (jobs, plugins, manager) => {
    return Object.keys(jobs).reduce((promiseChain, token) => {
        return promiseChain.then(() => {
            return processJob(token, plugins, manager);
        });
    }, Promise.resolve());
};
const processJobsConcurrently = (jobs, plugins, manager) => {
    return Promise.all(Object.keys(jobs).map((token) => {
        return processJob(token, plugins, manager);
    }));
};
/**
 * Runs through the batch-level lifecycle events of a batch. This includes the processing of each
 * individual job.
 *
 * Returns a promise resolving when all jobs in the batch complete.
 */
const processBatch = (jobs, plugins, manager, concurrent) => {
    return (lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.batchStart, plugins, manager)
        // process each job
        .then(() => {
        if (concurrent) {
            return processJobsConcurrently(jobs, plugins, manager);
        }
        return processJobsSerially(jobs, plugins, manager);
    })
        .then(() => {
        return lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.batchEnd, plugins, manager);
    })
        .catch((err) => {
        manager.recordError(err);
        lifecycle_1.errorSync(err, plugins, manager);
    }));
};
exports.renderBatch = (config, isClosing) => {
    return (req, res) => {
        if (isClosing()) {
            logger_1.default.info('Starting request when closing!');
        }
        const batchManager = new BatchManager_1.default(req, res, config);
        return processBatch(req.body, config.plugins, batchManager, config.processJobsConcurrent)
            .then(() => {
            if (isClosing()) {
                logger_1.default.info('Ending request when closing!');
            }
            return res.status(batchManager.statusCode)
                .json(batchManager.getResults())
                .end();
        })
            .catch(() => {
            res.status(batchManager.statusCode).end();
        });
    };
};
