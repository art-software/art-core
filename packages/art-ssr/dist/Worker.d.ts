/// <reference types="node" />
import { Application, Request } from 'express';
import { ServerConfig } from './RenderServer';
import http from 'http';
export declare class Worker {
    constructor(app: Application, config: ServerConfig, workerId?: number);
    private server;
    private app;
    private config;
    private workerId?;
    private closing;
    protected attachMiddleware(app: Application, config: ServerConfig): void;
    protected attachEndpoint(app: Application, config: ServerConfig, callback: () => any): void;
    private exit;
    protected close(server: http.Server): Promise<{}>;
    protected shutDownSequence(error?: Error, request?: Request, code?: number): void;
    protected initServer(app: Application, config: ServerConfig, callback?: () => any): void;
    private registerSignalHandler;
    start(): void;
}
