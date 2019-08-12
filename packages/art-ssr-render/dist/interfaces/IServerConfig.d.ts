/// <reference types="node" />
import { Options } from 'body-parser';
import winston from 'winston';
import { Application } from 'express';
export interface IServerConfig {
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
