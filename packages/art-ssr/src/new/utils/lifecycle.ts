import Logger from './Logger';

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