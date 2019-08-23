import { Request, Response } from 'express';
import { IServerConfig } from '../interfaces/IServerConfig';
export default class BatchRenderService {
    constructor(request: Request, response: Response, config: IServerConfig);
    private config;
    private plugins;
    private error;
    statusCode: number;
    private baseContext;
    private batchContext;
    private jobContexts;
    private pluginContexts;
    /**
     * Returns a context object scoped to a specific plugin and job (based on the plugin and
     * job token passed in).
     */
    private getJobContext;
    /**
     * Returns a context object scoped to a specific plugin and batch.
     */
    private getBatchContext;
    contextFor(plugin: any[], token?: string): any;
    protected notFound(name: string): ReferenceError;
    recordError(error: any, jobToken?: string): void;
    render(token: string): Promise<{
        name: string;
        token: string;
        props: any;
        metadata: any;
        statusCode: number;
        duration: number | null;
        html: string | null;
        css: string | null;
        state: string | null;
        returnMeta: any;
        error: any;
    }>;
    getResults(): {
        success: boolean;
        error: any;
        results: {};
    };
}
