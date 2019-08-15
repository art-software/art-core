import BatchRenderService from '../../services/BatchRenderService';
import { runLifecycle, runLifecycleSync, errorSync } from '../../utils/lifecycle';
import { Lifecycle } from '../../enums/Lifecycle';

/**
 * Runs through the job-level lifecycle events of the job based on the provided job token. This includes
 * the actual rendering of the job.
 *
 * Returns a promise resolving when the job completes.
 */
const processJob = (jobToken: string, plugins: any[], batchRenderService: BatchRenderService) => {
  return (
    runLifecycle(Lifecycle.jobStart, plugins, batchRenderService, jobToken)
      .then(() => {
        runLifecycleSync(Lifecycle.beforeRender, plugins, batchRenderService, jobToken);

        return batchRenderService.render(jobToken);
      })
      .then(() => {
        runLifecycleSync(Lifecycle.afterRender, plugins, batchRenderService, jobToken);

        return runLifecycle(Lifecycle.jobEnd, plugins, batchRenderService, jobToken);
      })
      .catch((err) => {
        batchRenderService.recordError(err, jobToken);
        errorSync(err, plugins, batchRenderService, jobToken);
      })
  );
};

const processJobsSerially = (jobs: any, plugins: any[], batchRenderService: BatchRenderService) => {
  return Object.keys(jobs).reduce(
    (promiseChain: Promise<any>, jobToken) => {
      return promiseChain.then(() => {
        return processJob(jobToken, plugins, batchRenderService);
      });
    },
    Promise.resolve()
  );
};

const processJobsConcurrently = (jobs: any, plugins: any[], batchRenderService: BatchRenderService) => {
  return Promise.all(
    Object.keys(jobs).map((jobToken) => {
      return processJob(jobToken, plugins, batchRenderService);
    })
  );
};

/**
 * Runs through the batch-level lifecycle events of a batch. This includes the processing of each
 * individual job.
 *
 * Returns a promise resolving when all jobs in the batch complete.
 */
export const processBatch = (jobs: any, plugins: any[], batchRenderService: BatchRenderService, concurrent: boolean) => {
  return (
    runLifecycle(Lifecycle.batchStart, plugins, batchRenderService)
      // process each job
      .then(() => {
        if (concurrent) {
          return processJobsConcurrently(jobs, plugins, batchRenderService);
        }

        return processJobsSerially(jobs, plugins, batchRenderService);
      })
      .then(() => {
        return runLifecycle(Lifecycle.batchEnd, plugins, batchRenderService);
      })
      .catch((err) => {
        batchRenderService.recordError(err);
        errorSync(err, plugins, batchRenderService);
      })
  );
};