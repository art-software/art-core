import { AxiosRequestConfig } from 'axios';
interface IOptions {
    url: string;
    plugins?: any[];
    config?: Partial<AxiosRequestConfig>;
}
export default class Aggregator {
    constructor(options: IOptions);
    private url;
    private plugins;
    private config;
    protected aggregatorWebApiServer: {
        requestPost: (url: string, options: {
            data: any;
        }) => Promise<any>;
    };
    addPlugin(plugin: any): void;
    private pluginReduce;
    createJobs(jobs: any): any;
    prepareRequest(jobs: any): Promise<{
        shouldSendRequest: any;
        jobsHash: any;
    }>;
    private renderHTML;
    private fallback;
    private toHTML;
    private toCss;
    private toState;
    render(data: any): Promise<any>;
}
export {};
