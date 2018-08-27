import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import favicon from 'serve-favicon';
import { join } from 'path';
import * as url from 'url';
import * as path from 'path';
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
import IndexPage from './pages/index';
const artConfigPath = join(process.cwd(), './package.json');
const artAppConfig = require(artConfigPath);
const envName = config.get('NODE_ENV') || 'development';

export default class App {

  private appTemplate(app: Application): void {
    const handlebars = exphbs.create({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: path.join(__dirname, '../views/layouts'),
      partialsDir: path.join(__dirname, '../views/partials'),
      helpers
    });
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');
    app.set('views', join(__dirname, '../views'));
  }

  // UPDATE  GLOBAL veriables for handbars views
  private appLocals(app: Application, expressPort: number, webpackPort: number, urls: any): void {
    let devHost = ensureSlash(config.get(`devHost:${envName}`), false);
    const devServerHost = ensureSlash(`${devHost}:${expressPort}`, false);

    devHost = devHost
      ? ensureSlash(`${devHost}:${webpackPort}`, false)
      : ensureSlash(urls.localUrlForBrowser.replace(expressPort, webpackPort), false);

    console.log(
      `envName: ${envName}
      devHost: ${devHost}
      devServerHost: ${devServerHost}`
    );
    Object.assign(app.locals, {
      env: envName,
      ART_CDN_ROOT: devHost,
      ART_SERVER_HOST_ROOT: devServerHost,
      ART_SERVER_API_ROOT: devServerHost + '/api'
    });
  }

  private controllers() {
    return [join(__dirname, './controllers/*')];
  }

  private appIndexPage(app: Application) {
    const indexPage = new IndexPage();
    app.use('/', (req, res, next) => {
      (req as any).moduleBase = '/';
      next();
    });

    app.use(/\/[^.]*$|^(?:https?:)?\/\/[^/]+$/, (req, res) => {
      indexPage.indexPage(req, res);
    });
  }

  private async createApp(): Promise<Application> {
    const app = express();
    const publicPath = join(process.cwd(), './publish');
    app.use(favicon(join(__dirname, '../favicon.ico')));
    app.use('/publish', compression(), express.static(publicPath));
    this.appTemplate(app);
    this.appIndexPage(app);
    await useExpressServer(app, {
      controllers: this.controllers()
    });
    return app;
  }

  public async start() {

    const host = config.get('HOST') || '0.0.0.0';
    const webpackPort = config.get('ART_WEBPACK_PORT') || 3000;
    console.log(`webpackPort: ${webpackPort}`);
    const protocol = config.get('HTTPS') === 'true' ? 'https' : 'http';
    const appName = artAppConfig.name;
    const isProd = process.env.NODE_ENV === 'production';

    let expressPort: number | null = null;
    try {
      expressPort = await choosePort(host, isProd ? webpackPort : parseInt(webpackPort, 10) + 1);
    } catch (err) {
      return console.log(err);
    }

    console.log(`expressPort: ${expressPort}`);

    const app = await this.createApp();

    if (expressPort === null) { return; }
    app.listen(expressPort, host, (err) => {
      if (err) { return console.log(err); }

      const urls = prepareUrls(protocol, host, expressPort);
      const { hostname } = url.parse(config.get(`devHost:${envName}`));

      this.appLocals(app, expressPort as number, isProd ? expressPort : webpackPort, urls);
      printInstructions(appName, urls);

      if (config.get('ART_SUPERVISOR_STATUS') === 'false') {
        if (!hostname) { return console.log(warningText('no valid hostname')); }
        openBrowser(urls.localUrlForBrowser.replace('localhost', hostname));
      }
    });

  }
}