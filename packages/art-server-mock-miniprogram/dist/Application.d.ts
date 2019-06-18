interface ServerConfig {
    host?: string;
    port?: number;
}
export default class App {
    constructor(serverConfig: ServerConfig);
    private serverConfig;
    private controllers;
    private createApp;
    start(): Promise<void>;
}
export {};
