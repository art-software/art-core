import { Options } from 'body-parser';
import express, { Application } from 'express';
import Logger from './utils/Logger';
import winston from 'winston';
import cluster from 'cluster';
import { Coordinator } from './Coordinator';

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
}

function createApplication() {
  return express();
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
  createApplication
};

export default class RenderServer {
  constructor(config: Partial<ServerConfig> & { getComponent: any }, onServer?: any) {
    this.config = { ...defaultConfig, ...config };

    // init logger
    Logger.init(this.config.logger, this.config.loggerInstance);
  }

  public config: ServerConfig;
  private app: Application;

  private createApp() {
    this.app = this.config.createApplication();
  }

  public start() {
    // create an express app
    this.createApp();
    if (this.config.devMode) {
      // TODO
      // worker
    } else if (cluster.isMaster) {
      const coordinator = new Coordinator();
      coordinator.start();
    } else {
      // TODO
      // worker
    }
  }
}