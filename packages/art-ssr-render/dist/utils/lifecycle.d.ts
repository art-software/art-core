import BatchRenderService from '../services/BatchRenderService';
import { IServerConfig } from '../interfaces/IServerConfig';
export declare const raceTo: (promise: Promise<any>, ms: number, msg: string) => Promise<any>;
export declare const runAppLifecycle: (lifecycle: string, config: IServerConfig, error?: any, ...args: any[]) => Promise<any>;
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
export declare const runLifecycle: (lifecycle: string, plugins: any[], batchRenderService: BatchRenderService, token?: string | undefined) => Promise<any>;
/**
 * Iterates through the plugins and calls the specified synchronous lifecycle event (when present).
 * Passes in the appropriate context object for the plugin/job.
 *
 * This function is currently being used for `afterRender` and `beforeRender`.
 */
export declare const runLifecycleSync: (lifecycle: string, plugins: any[], batchRenderService: BatchRenderService, token?: string | undefined) => void;
/**
 * Iterates through the plugins and calls the specified synchronous `onError` handler
 * (when present).
 *
 * Passes in the appropriate context object, as well as the error.
 */
export declare const errorSync: (err: any, plugins: any[], batchRenderService: BatchRenderService, token?: string | undefined) => void;
