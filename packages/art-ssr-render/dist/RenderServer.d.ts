/// <reference types="node" />
import 'reflect-metadata';
import { Options } from 'body-parser';
import winston from 'winston';
import { Application } from 'express';
export interface ServerConfig {
    bodyParser: Options;
    devMode: boolean;
    getCPUs?: any;
    endpoint: string;
    files: any[];
    logger: winston.LoggerOptions;
    plugins: any[];
    port: number;
    host: string;
    processJobsConcurrent: boolean;
    loggerInstance?: winston.Logger;
    onServer?: (app: Application, process: NodeJS.Process) => any;
}
export default class RenderServer {
    constructor(config: Partial<ServerConfig>);
    private app;
    config: ServerConfig;
    private initApplication;
    start(): void;
}
