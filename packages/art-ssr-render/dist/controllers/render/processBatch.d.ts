import BatchRenderService from '../../services/BatchRenderService';
/**
 * Runs through the batch-level lifecycle events of a batch. This includes the processing of each
 * individual job.
 *
 * Returns a promise resolving when all jobs in the batch complete.
 */
export declare const processBatch: (jobs: any, plugins: any[], batchRenderService: BatchRenderService, concurrent: boolean) => Promise<any>;
