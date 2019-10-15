import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import { join } from 'path';

const defaultConfig = {
  application: {
    hostname: 'me.dev.com',
    port: 13333
  }
};

export default class Server {

  protected controllers() {
    const ctrls: string[] = [];
    ctrls.push(join(__dirname, './controllers/**/*.js'));
    return ctrls;
  }

  protected createApp(): Application {
    const app = express();
    // @ts-ignore
    // app.use(favicon(join(__dirname, './favicon.ico')));
    useExpressServer(app, {
      controllers: this.controllers()
    });
    return app;
  }

  public async start() {
    const SERVER_HOST = process.env.HOSTNAME || defaultConfig.application.hostname;
    const SERVER_PORT = process.env.PORT || defaultConfig.application.port;

    if (!(SERVER_HOST && SERVER_PORT)) {
      console.log('Unknown SERVER_HOST or SERVER_PORT');
      return;
    }

    const app = this.createApp();

    const serverUrl = `${SERVER_HOST}:${SERVER_PORT}`;
    app.listen(SERVER_PORT, () => {
      console.log('Server is running at: ', serverUrl);
    });
  }
}