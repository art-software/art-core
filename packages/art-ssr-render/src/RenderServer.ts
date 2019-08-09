import 'reflect-metadata';
import { Options } from 'body-parser';
import winston from 'winston';
import express, { Application } from 'express';
import { Container } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';
import { join } from 'path';
import { ServerConfig as Config } from './config/ServerConfig';
import bodyParser from 'body-parser';

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
  constructor(config: Partial<ServerConfig> & { getComponent: any }) {
    this.config = { ...defaultConfig, ...config };

    useContainer(Container);

    Config.set(this.config);

    this.app = express();
  }

  private app: Application;

  public config: ServerConfig;

  private initApplication() {
    this.app.use(bodyParser.json(this.config.bodyParser));
    useExpressServer(this.app, {
      controllers: [ join(__dirname, './controllers/render/RenderController.js') ]
    });
  }

  public start() {
    this.initApplication();
    this.app.listen(this.config.port, () => {
      console.log('Server is listening on port: ', this.config.port);
    });
  }
}