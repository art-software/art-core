import { Application, Request } from 'express';
import { ServerConfig } from './RenderServer';
import bodyParser from 'body-parser';
import { runAppLifecycle, raceTo } from './utils/lifecycle';
import { Lifecycle } from './enums/Lifecycle';
import http from 'http';
import Logger from './utils/logger';
import { Termination } from './enums/Signals';
import { renderBatch } from './controllers/render/renderBatch';

export class Worker {
  constructor(app: Application, config: ServerConfig, workerId?: number) {
    this.server = null;
    this.app = app;
    this.config = config;
    this.workerId = workerId;
    this.closing = false;
  }

  private server: http.Server | null;
  private app: Application;
  private config: ServerConfig;
  private workerId?: number;
  private closing: boolean;

  protected attachMiddleware(app: Application, config: ServerConfig) {
    app.use(bodyParser.json(config.bodyParser));
  }

  protected attachEndpoint (app: Application, config: ServerConfig, callback: () => any) {
    app.post(config.endpoint, renderBatch(config, callback));
  }

  private exit(code: number) {
    return () => {
      return process.exit(code);
    };
  }

  // close server
  protected close(server: http.Server) {
    return new Promise((resolve) => {
      if (!server) {
        resolve();
        return;
      }

      try {
        this.closing = true;
        server.close((err) => {
          if (err) {
            Logger.info('Ran into error during close', { stack: err.stack });
          }
          resolve();
        });
      } catch (err) {
        Logger.info('Ran into error on close', { stack: err.stack });
        resolve();
      }
    });
  }

  protected shutDownSequence(error?: Error, request?: Request, code: number = 1) {
    if (error) {
      Logger.info(error.stack || '');
    }

    if (!this.server) { return; }
    raceTo(this.close(this.server), 1000, 'Closing the worker took too long.')
      .then(() => {
        return runAppLifecycle(Lifecycle.shutDown, this.config, error, request);
      })
      .then(this.exit(code))
      .catch(this.exit(code));
  }

  protected initServer(app: Application, config: ServerConfig, callback?: () => any) {
    process.on('message', (message) => {
      if (message === 'kill') {
        this.shutDownSequence();
      }
    });

    runAppLifecycle(Lifecycle.initialize, config)
      .then(() => {
        this.server = app.listen(config.port, config.host, callback);
        return null;
      })
      .catch(this.shutDownSequence);
  }

  private registerSignalHandler(sig: NodeJS.Signals) {
    process.on(sig, () => {
      Logger.info(`SSR worker got ${sig}. Going down`);
      this.shutDownSequence(undefined, undefined, 0);
    });
  }

  public start() {
    this.attachMiddleware(this.app, this.config);

    if (this.config.onServer) {
      this.config.onServer(this.app, process);
    }

    this.initServer(this.app, this.config, () => {
      if (process.send) {
        // tell our coordinator that we're ready to start receiving requests
        process.send({ workerId: this.workerId, ready: true });
      }

      Logger.info('Connected', { listen: [this.config.host, this.config.port] });
    });

    this.attachEndpoint(this.app, this.config, () => {
      return this.server && this.closing;
    });

    // Gracefully shutdown the worker when not running in a cluster (devMode = true)
    if (this.config.devMode) {
      [Termination.SIGTERM, Termination.SIGINT].forEach((signal) => {
        this.registerSignalHandler(signal);
      });
    }
  }
}