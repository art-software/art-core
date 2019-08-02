import 'reflect-metadata';
import { Options } from 'body-parser';
import winston from 'winston';
import { Application } from 'express';
import { Container } from 'typedi';
import { createExpressServer, useContainer } from 'routing-controllers';
import path from 'path';
import { ServerConfig as Config } from './config/ServerConfig';

export interface ServerConfig {
  bodyParser: Options;
  devMode: boolean;
  // getComponent: any;
  getCPUs?: any;
  endpoint: string;
  files: any[];
  logger: winston.LoggerOptions;
  plugins: any[];
  port: number;
  host: string;
  processJobsConcurrent: boolean;
  // createApplication: () => Application;
  loggerInstance?: winston.Logger;
  onServer?: (app: Application, process: NodeJS.Process) => any;
}

const defaultConfig = {
  bodyParser: {
    limit: 1024 * 1000,
  },
  devMode: false,
  endpoint: '/batch',
  files: [],
  logger: {},
  plugins: [],
  port: 8080,
  host: '0.0.0.0',
  processJobsConcurrent: true,
  // createApplication
};

export default class RenderServer {
  // constructor(config: Partial<ServerConfig> & { getComponent: any }) {
  constructor(config: Partial<ServerConfig>) {
    this.config = { ...defaultConfig, ...config };

    useContainer(Container);

    Config.set(this.config);
  }

  public config: ServerConfig;

  private initApplication() {
    const app = createExpressServer({
      controllers: [ path.join(__dirname, './controllers/render/RenderController.js') ]
    });
    return app;
  }

  public start() {
    const app = this.initApplication();
    app.listen(this.config.port);
  }
}