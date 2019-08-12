import 'reflect-metadata';
import { IServerConfig } from './interfaces/IServerConfig';
export default class RenderServer {
    constructor(config: Partial<IServerConfig> & {
        getComponent: any;
    });
    private app;
    config: IServerConfig;
    private initApplication;
    start(): void;
}
