import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import compression from 'compression';
import choosePort from 'art-dev-utils/lib/choosePort';
import printInstructions from 'art-dev-utils/lib/printInstructions';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
const artConfigPath = join(process.cwd(), './package.json');
const artAppConfig = require(artConfigPath);

interface ServerConfig {
  host?: string;
  port?: number;
}

export default class App {
  constructor(serverConfig: ServerConfig) {
    this.serverConfig = serverConfig;
  }

  private serverConfig: ServerConfig;

  private controllers() {
    const ctrls: string[] = [];
    const bizConrtollers = join(process.cwd(), './mock');
    if (fs.existsSync(bizConrtollers)) {
      ctrls.push(join(bizConrtollers, './dist/**/*'));
    }
    ctrls.push(join(__dirname, './controllers/*'));
    return ctrls;
  }

  private createApp(): Application {
    const app = express();
    const publicPath = join(process.cwd(), './public');
    app.use('/public', compression(), express.static(publicPath));
    useExpressServer(app, {
      routePrefix: '/mock_api',
      controllers: this.controllers()
    });
    return app;
  }

  public async start() {
    const host = this.serverConfig.host || process.env.SERVER_HOST;
    const port = Number(this.serverConfig.port || process.env.SERVER_PORT);
    const appName = artAppConfig.name;

    let expressPort: number | null = null;
    try {
      expressPort = await choosePort(host as string, port);
    } catch (err) {
      return console.log(err);
    }

    const app = this.createApp();

    if (expressPort === null) { return; }
    const server = app.listen(expressPort, host as string, (err) => {
      if (err) { return console.log(err); }

      const urls = prepareUrls('http', host, expressPort);
      printInstructions(appName, urls);
    });
  }
}