"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lifecycle_1 = require("../../utils/lifecycle");
const Lifecycle_1 = require("../../enums/Lifecycle");
/**
 * Runs through the job-level lifecycle events of the job based on the provided job token. This includes
 * the actual rendering of the job.
 *
 * Returns a promise resolving when the job completes.
 */
const processJob = (jobToken, plugins, batchRenderService) => {
    return (lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.jobStart, plugins, batchRenderService, jobToken)
        .then(() => {
        lifecycle_1.runLifecycleSync(Lifecycle_1.Lifecycle.beforeRender, plugins, batchRenderService, jobToken);
        return batchRenderService.render(jobToken);
    })
        .then(() => {
        lifecycle_1.runLifecycleSync(Lifecycle_1.Lifecycle.afterRender, plugins, batchRenderService, jobToken);
        return lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.jobEnd, plugins, batchRenderService, jobToken);
    })
        .catch((err) => {
        batchRenderService.recordError(err, jobToken);
        lifecycle_1.errorSync(err, plugins, batchRenderService, jobToken);
    }));
};
const processJobsSerially = (jobs, plugins, batchRenderService) => {
    return Object.keys(jobs).reduce((promiseChain, jobToken) => {
        return promiseChain.then(() => {
            return processJob(jobToken, plugins, batchRenderService);
        });
    }, Promise.resolve());
};
const processJobsConcurrently = (jobs, plugins, batchRenderService) => {
    return Promise.all(Object.keys(jobs).map((jobToken) => {
        return processJob(jobToken, plugins, batchRenderService);
    }));
};
/**
 * Runs through the batch-level lifecycle events of a batch. This includes the processing of each
 * individual job.
 *
 * Returns a promise resolving when all jobs in the batch complete.
 */
exports.processBatch = (jobs, plugins, batchRenderService, concurrent) => {
    return (lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.batchStart, plugins, batchRenderService)
        // process each job
        .then(() => {
        if (concurrent) {
            return processJobsConcurrently(jobs, plugins, batchRenderService);
        }
        return processJobsSerially(jobs, plugins, batchRenderService);
    })
        .then(() => {
        return lifecycle_1.runLifecycle(Lifecycle_1.Lifecycle.batchEnd, plugins, batchRenderService);
    })
        .catch((err) => {
        batchRenderService.recordError(err);
        lifecycle_1.errorSync(err, plugins, batchRenderService);
    }));
};
