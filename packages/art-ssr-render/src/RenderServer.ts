import 'reflect-metadata';
import express, { Application } from 'express';
import { useExpressServer } from 'routing-controllers';
import { join } from 'path';
import { ServerConfig as Config } from './config/ServerConfig';
import { IServerConfig } from './interfaces/IServerConfig';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Worker } from './Worker';
import cluster from 'cluster';
import Coordinator from './Coordinator';

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

function createApplication() {
  return express();
}

export default class RenderServer {
  constructor(config: Partial<IServerConfig> & { getComponent: any }) {
    this.config = { ...defaultConfig, ...config };

    Config.set(this.config);

    this.app = express();
  }

  private app: Application;

  public config: IServerConfig;

  private initApplication() {
    this.app.use(bodyParser.json(this.config.bodyParser));
    this.app.use(compression());
    useExpressServer(this.app, {
      controllers: [join(__dirname, './controllers/render/RenderController.js')]
    });
  }

  public start() {
    this.initApplication();
    if (this.config.devMode) {
      const worker = new Worker(this.app, this.config);
      worker.start();
    } else if (cluster.isMaster) {
      const coordinator = new Coordinator();
      coordinator.start();
    } else {
      const worker = new Worker(this.app, this.config, cluster.worker.id);
      worker.start();
    }
  }
}