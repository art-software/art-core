import { useExpressServer } from 'routing-controllers';
import express, { Application } from 'express';
import favicon from 'serve-favicon';
import { join } from 'path';
import * as url from 'url';
import * as fs from 'fs';
import compression from 'compression';
import exphbs from 'express-handlebars';
import helpers from 'handlebars-helpers';
import choosePort from 'art-dev-utils/lib/choosePort';
import printInstructions from 'art-dev-utils/lib/printInstructions';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
// TODO optimize it later
const config = require('./config/config');
import openBrowser from 'art-dev-utils/lib/openBrowser';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import IndexPage from './pages/index';
const artConfigPath = join(process.cwd(), './package.json');
const artAppConfig = require(artConfigPath);
const envName = config.get('NODE_ENV') || 'development';
let artModules = JSON.parse(config.get('ART_MODULES')) || [];
if (typeof artModules === 'string') {
  artModules = JSON.parse(artModules);
}

export default class App {

  private appTemplate(app: Application): void {
    const handlebars = exphbs.create({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: join(__dirname, '../views/layouts'),
      partialsDir: join(__dirname, '../views/partials'),
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

    Object.assign(app.locals, {
      env: envName,
      ART_CDN_ROOT: devHost,
      ART_SERVER_HOST_ROOT: devServerHost,
      ART_SERVER_API_ROOT: devServerHost + '/mock_api'
    });
  }

  private controllers() {
    const ctrls: string[] = [];
    const bizConrtollers = join(process.cwd(), './mock');
    if (fs.existsSync(bizConrtollers)) {
      ctrls.push(join(bizConrtollers, './dist/**/*'));
    }
    ctrls.push(join(__dirname, './controllers/*'));
    return ctrls;
  }

  private appIndexPage(app: Application) {
    const indexPage = new IndexPage();
    app.use('/', (req, res, next) => {
      (req as any).moduleBase = '/';
      next();
    });

    app.use(/\/[^.]*$|^(?:https?:)?\/\/[^/]+$/, (req, res) => {
      indexPage.indexPage(req, res, artModules);
    });
  }

  private createApp(): Application {
    const app = express();
    const publicPath = join(process.cwd(), './public');
    app.use(favicon(join(__dirname, '../favicon.ico')));
    app.use('/public', compression(), express.static(publicPath));
    const vendorPath = join(__dirname, '../../art-lib-react/dist/vendors/');
    app.use('/static', compression(), express.static(vendorPath) );
    this.appTemplate(app);
    useExpressServer(app, {
      routePrefix: '/mock_api',
      controllers: this.controllers()
    });
    this.appIndexPage(app);
    return app;
  }

  public async start() {

    const host = config.get('HOST') || '0.0.0.0';
    const webpackPort = config.get('ART_WEBPACK_PORT') || 3000;
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

      if (config.get('ART_SUPERVISOR_STATUS') === 'false') {
        if (!hostname) { return console.log(warningText('no valid hostname')); }
        openBrowser(urls.localUrlForBrowser.replace('localhost', hostname));
      }
    });

  }
}