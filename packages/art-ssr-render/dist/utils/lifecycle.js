"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const PROMISE_TIMEOUT = {};
exports.raceTo = (promise, ms, msg) => {
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
            Logger_1.default.info(msg, { timeout: ms });
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
const hasMethod = (name) => {
    return (obj) => {
        return typeof obj[name] === 'function';
    };
};
const MAX_LIFECYCLE_EXECUTION_TIME_IN_MS = 300;
exports.runAppLifecycle = (lifecycle, config, error, ...args) => {
    try {
        const promise = Promise.all(config.plugins
            .filter(hasMethod(lifecycle))
            .map((plugin) => {
            return plugin[lifecycle](error, ...args);
        }));
        return exports.raceTo(promise, MAX_LIFECYCLE_EXECUTION_TIME_IN_MS, `App lifecycle method ${lifecycle} took too long.`);
    }
    catch (err) {
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
exports.runLifecycle = (lifecycle, plugins, batchRenderService, token) => {
    try {
        const promise = Promise.all(plugins
            .filter(hasMethod(lifecycle))
            .map((plugin) => {
            return plugin[lifecycle](batchRenderService.contextFor(plugin, token));
        }));
        return exports.raceTo(promise, MAX_LIFECYCLE_EXECUTION_TIME_IN_MS, `Lifecycle method ${lifecycle} took too long.`);
    }
    catch (err) {
        return Promise.reject(err);
    }
};
/**
 * Iterates through the plugins and calls the specified synchronous lifecycle event (when present).
 * Passes in the appropriate context object for the plugin/job.
 *
 * This function is currently being used for `afterRender` and `beforeRender`.
 */
exports.runLifecycleSync = (lifecycle, plugins, batchRenderService, token) => {
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
exports.errorSync = (err, plugins, batchRenderService, token) => {
    plugins
        .filter(hasMethod('onError'))
        .forEach((plugin) => {
        return plugin.onError(batchRenderService.contextFor(plugin, token), err);
    });
};
