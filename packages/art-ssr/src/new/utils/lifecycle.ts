import Logger from './Logger';
import { ServerConfig } from '../RenderServer';

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
export const runAppLifecycle =
  (lifecycle: string, config: ServerConfig, error?: any, ...args: any[]): Promise<any> => {
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