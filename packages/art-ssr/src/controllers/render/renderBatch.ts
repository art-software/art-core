import { ServerConfig } from '../../RenderServer';
import { Request, Response } from 'express';
import Logger from '../../utils/logger';
import BatchManager from './BatchManager';
import { runLifecycle, runLifecycleSync, errorSync } from '../../utils/lifecycle';
import { Lifecycle } from '../../enums/Lifecycle';

/**
 * Runs through the job-level lifecycle events of the job based on the provided token. This includes
 * the actual rendering of the job.
 *
 * Returns a promise resolving when the job completes.
 */
const processJob = (token: string, plugins: any[], manager: BatchManager) => {
  return (
    runLifecycle(Lifecycle.jobStart, plugins, manager, token)
      .then(() => {
        runLifecycleSync(Lifecycle.beforeRender, plugins, manager, token);

        return manager.render(token);
      })
      .then(() => {
        runLifecycleSync(Lifecycle.afterRender, plugins, manager, token);

        return runLifecycle(Lifecycle.jobEnd, plugins, manager, token);
      })
      .catch((err) => {
        manager.recordError(err, token);
        errorSync(err, plugins, manager, token);
      })
  );
};

const processJobsSerially = (jobs: any, plugins: any[], manager: BatchManager) => {
  return Object.keys(jobs).reduce(
    (promiseChain: Promise<any>, token) => {
      return promiseChain.then(() => {
        return processJob(token, plugins, manager);
      });
    },
    Promise.resolve()
  );
};

const processJobsConcurrently = (jobs: any, plugins: any[], manager: BatchManager) => {
  return Promise.all(
    Object.keys(jobs).map((token) => {
      return processJob(token, plugins, manager);
    })
  );
};

/**
 * Runs through the batch-level lifecycle events of a batch. This includes the processing of each
 * individual job.
 *
 * Returns a promise resolving when all jobs in the batch complete.
 */
const processBatch = (jobs: any, plugins: any[], manager: BatchManager, concurrent: boolean) => {
  return (
    runLifecycle(Lifecycle.batchStart, plugins, manager)
      // process each job
      .then(() => {
        if (concurrent) {
          return processJobsConcurrently(jobs, plugins, manager);
        }

        return processJobsSerially(jobs, plugins, manager);
      })
      .then(() => {
        return runLifecycle(Lifecycle.batchEnd, plugins, manager);
      })
      .catch((err) => {
        manager.recordError(err);
        errorSync(err, plugins, manager);
      })
  );
};

export const renderBatch = (config: ServerConfig, isClosing: () => boolean) => {
  return (req: Request, res: Response) => {
    if (isClosing()) {
      Logger.info('Starting request when closing!');
    }

    const batchManager = new BatchManager(req, res, config);

    return processBatch(req.body, config.plugins, batchManager, config.processJobsConcurrent)
      .then(() => {
        if (isClosing()) {
          Logger.info('Ending request when closing!');
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