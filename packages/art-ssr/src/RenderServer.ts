import { Options } from 'body-parser';
import express, { Application } from 'express';
import Logger from './utils/logger';
import winston from 'winston';
import cluster from 'cluster';
import { Coordinator } from './Coordinator';
import { Worker } from './Worker';

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
  constructor(config: Partial<ServerConfig> & { getComponent: any }) {
    this.config = { ...defaultConfig, ...config };

    console.log('init server');
    // TODO
    // init logger
    // Logger.init(this.config.logger, this.config.loggerInstance);
  }

  public config: ServerConfig;

  private createApp() {
    const app = this.config.createApplication();
    return app;
  }

  public start() {
    // create an express app
    const app = this.createApp();
    if (this.config.devMode) {
      const worker = new Worker(app, this.config);
      worker.start();
    } else if (cluster.isMaster) {
      const coordinator = new Coordinator();
      console.log('coordinator');
      coordinator.start();
    } else {
      console.log('worker');
      const worker = new Worker(app, this.config, cluster.worker.id);
      worker.start();
    }
  }
}