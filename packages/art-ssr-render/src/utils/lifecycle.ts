import Logger from './Logger';
import BatchRenderService from '../services/BatchRenderService';
import { IServerConfig } from '../interfaces/IServerConfig';

const PROMISE_TIMEOUT = {};
export const raceTo = (promise: Promise<any>, ms: number, msg: string) => {
  let timeout;
  return Promise.race([
    promise,
    new Promise((resolve) => {
      timeout = setTimeout(() => {
        resolve(PROMISE_TIMEOUT);
      }, ms);
    })
  ])
    .then((result) => {
      if (result === PROMISE_TIMEOUT) {
        Logger.info(msg, { timeout: ms });
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      return result;
    })
    .catch((err) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      return Promise.reject(err);
    });

};

const hasMethod = (name: string) => {
  return (obj: any) => {
    return typeof obj[name] === 'function';
  };
};

const MAX_LIFECYCLE_EXECUTION_TIME_IN_MS = 300;
export const runAppLifecycle = (lifecycle: string, config: IServerConfig, error?: any, ...args: any[]): Promise<any> => {
  try {
    const promise = Promise.all(
      config.plugins
        .filter(hasMethod(lifecycle))
        .map((plugin) => {
          return plugin[lifecycle](error, ...args);
        })
    );

    return raceTo(
      promise,
      MAX_LIFECYCLE_EXECUTION_TIME_IN_MS,
      `App lifecycle method ${lifecycle} took too long.`,
    );
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Iterates through the plugins and calls the specified asynchronous lifecycle event,
 * returning a promise that resolves when they are all completed, or rejects if one of them
 * fails.
 *
 * This is meant to be used on lifecycle events both at the batch level and the job level. The
 * passed in BatchRenderService is used to get the corresponding context object for the plugin/job and
 * is passed in as the first argument to the plugin's method.
 *
 * This function is currently used for `batchStart/End` and `jobStart/End`.
 *
 */
export const runLifecycle = (lifecycle: string, plugins: any[], batchRenderService: BatchRenderService, token?: string) => {
  try {
    const promise = Promise.all(
      plugins
        .filter(hasMethod(lifecycle))
        .map((plugin) => {
          return plugin[lifecycle](batchRenderService.contextFor(plugin, token));
        })
    );

    return raceTo(
      promise,
      MAX_LIFECYCLE_EXECUTION_TIME_IN_MS,
      `Lifecycle method ${lifecycle} took too long.`,
    );
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Iterates through the plugins and calls the specified synchronous lifecycle event (when present).
 * Passes in the appropriate context object for the plugin/job.
 *
 * This function is currently being used for `afterRender` and `beforeRender`.
 */
export const runLifecycleSync = (lifecycle: string, plugins: any[], batchRenderService: BatchRenderService, token?: string) => {
  plugins
    .filter(hasMethod(lifecycle))
    .forEach((plugin) => {
      return plugin[lifecycle](batchRenderService.contextFor(plugin, token));
    });
};

/**
 * Iterates through the plugins and calls the specified synchronous `onError` handler
 * (when present).
 *
 * Passes in the appropriate context object, as well as the error.
 */
export const errorSync = (err: any, plugins: any[], batchRenderService: BatchRenderService, token?: string) => {
  plugins
    .filter(hasMethod('onError'))
    .forEach((plugin) => {
      return plugin.onError(batchRenderService.contextFor(plugin, token), err);
    });
};