/// <reference types="node" />
import { Options } from 'body-parser';
import { Application } from 'express';
import winston from 'winston';
export interface ServerConfig {
    bodyParser: Options;
    devMode: boolean;
    getComponent: any;
    getCPUs?: any;
    endpoint: string;
    files: any[];
    logger: winston.LoggerOptions;
    plugins: any[];
    port: number;
    host: string;
    processJobsConcurrent: boolean;
    createApplication: () => Application;
    loggerInstance?: winston.Logger;
    onServer?: (app: Application, process: NodeJS.Process) => any;
}
export default class RenderServer {
    constructor(config: Partial<ServerConfig> & {
        getComponent: any;
    });
    config: ServerConfig;
    private createApp;
    start(): void;
}
