import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import favicon from 'serve-favicon';
import { join } from 'path';
import * as url from 'url';
import compression from 'compression';
import exphbs from 'express-handlebars';
import helpers from 'handlebars-helpers';
import choosePort from 'art-dev-utils/lib/choosePort';
import printInstructions from 'art-dev-utils/lib/printInstructions';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import config from './config/config';
import openBrowser from 'art-dev-utils/lib/openBrowser';
import { warningText } from 'art-dev-utils/lib/chalkColors';
const artConfigPath = join(process.cwd(), './art.config.js');
const artAppConfig = require(artConfigPath);
const envName = config.get('NODE_ENV') || 'development';

export default class App {

  private appTemplate(app: Application): void {
    const handlebars = exphbs.create({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: 'art-server-mock/views/layouts/',
      partialsDir: 'art-server-mock/views/partials/',
      helpers
    });
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
    app.set('view', join(__dirname, '../views'));
  }

  // UPDATE  GLOBAL veriables for handbars views
  private appLocals(app: Application, expressPort: number, webpackPort: number, urls: any): void {
    let devHost = ensureSlash(config.get(`devHost:${envName}`), false);
    const devServerHost = ensureSlash(`${devHost}:${expressPort}`, false);

    devHost = devHost
      ? ensureSlash(`${devHost}:${webpackPort}`, false)
      : ensureSlash(urls.localUrlForBrowser.replace(expressPort, webpackPort), false);

    Object.assign(app.locals, {
      env: envName,
      ART_CDN_ROOT: devHost,
      ART_SERVER_HOST_ROOT: devServerHost,
      ART_SERVER_API_ROOT: devServerHost + '/api'
    });
  }

  private constrollers () {
    return [ join(__dirname, './controllers/*') ];
  }

  private createApp(): Application {
    const app = express();
    const publicPath = join(process.cwd(), './publish');
    app.use(favicon(join(__dirname, '../favicon.ico')));
    app.use('/publish', compression(), express.static(publicPath));
    this.appTemplate(app);
    useExpressServer(app, {
      controllers: this.constrollers()
    });

    return app;
  }

  public async start() {

    const host = config.get('HOST') || '0.0.0.0';
    const webpackPort = config.get('VENUS_WEBPACK_PORT') || 3000;
    const protocol = config.get('HTTPS') === 'true' ? 'https' : 'http';
    const appName = artAppConfig.name;
    const isProd = process.env.NODE_ENV === 'production';

    let expressPort: number | null = null;
    try {
      expressPort = await choosePort(host, isProd ? webpackPort : parseInt(webpackPort, 10) + 1);
    } catch (err) {
      return console.log(err);
    }

    const app = this.createApp();

    if (expressPort === null) { return; }
    app.listen(expressPort, host, (err) => {
      if (err) { return console.log(err); }

      const urls = prepareUrls(protocol, host, expressPort);
      const { hostname } = url.parse(config.get(`devHost:${envName}`));

      this.appLocals(app, expressPort as number, isProd ? expressPort : webpackPort, urls);
      printInstructions(appName, urls);

      if (config.get('VENUS_SUPERVISOR_STATUS') === 'false') {
        if (!hostname) { return console.log(warningText('no valid hostname')); }
        openBrowser(urls.localUrlForBrowser.replace('localhost', hostname));
      }
    });

  }
}