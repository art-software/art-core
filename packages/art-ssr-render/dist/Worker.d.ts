/// <reference types="node" />
import { Application } from 'express';
import { IServerConfig } from './interfaces/IServerConfig';
import http from 'http';
export declare class Worker {
    constructor(app: Application, config: IServerConfig, workerId?: number);
    private server;
    private app;
    private config;
    private workerId?;
    private closing;
    protected close(server: http.Server): Promise<{}>;
    private exit;
    protected shutDownSequence(error?: Error, request?: Request, code?: number): void;
    protected initServer(app: Application, config: IServerConfig, callback?: () => any): void;
    private registerSignalHandler;
    start(): void;
}
