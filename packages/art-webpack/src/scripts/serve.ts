import { confirmModules } from '../utils/inquirer';
import appConfig from '../config/appConfig';
import choosePort from 'art-dev-utils/lib/choosePort';
import webpackDevServeConfig from '../config/webpackDevServer';
import createServeCompiler from '../utils/createServeCompiler';
import { getWebpackConfig } from '../config';
import prepareProxy from 'art-dev-utils/lib/prepareProxy';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
import WebpackDevServer from 'webpack-dev-server';
import clearConsole from 'art-dev-utils/lib/clearConsole';
import { cyanText } from 'art-dev-utils/lib/chalkColors';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import * as path from 'path';
import paths from '../config/paths';

const envName = appConfig.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig.get(`devPort:${envName}`);
const isInteractive = process.stdout.isTTY;

let nodeServerHasLunched = false;
const lunchNodeServer = (port: number) => {
  const artModules = appConfig.get('ART_MODULES');

  if (nodeServerHasLunched) { return; }
  if (isInteractive) { clearConsole(); }
  const mockServerPath = path.join(__dirname, '../../../art-server-mock/dist/index.js');
  const nodemonPath = path.join(require.resolve('nodemon'), '../../bin/nodemon.js');
  executeNodeScript(
    nodemonPath,
    '--watch', paths.appMockServer,
    '--ignore', paths.appMockServer,
    '-e', 'js, jsx, ts',
    mockServerPath,
    '--ART_MODULES', `${JSON.stringify(artModules)}`,
    '--ART_WEBPACK_PORT', `${port}`
  );

  nodeServerHasLunched = true;
};

let compileMockServerHasLunched = false;
const compileMockServer = () => {

  if (compileMockServerHasLunched) { return; }

  executeNodeScript(
    process.env.STAGE === 'dev' ?
      '../../node_modules/.bin/tsc' :
      path.join(process.cwd(), 'node_modules/.bin/tsc'),
    '-p', `${paths.appMockServerConfig}`,
    '-w'
  );

  compileMockServerHasLunched = true;
};

const confirmModulesCb = (answer) => {
  if (answer.availableModulesOk === false) { return; }
  choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
      if (port === null) { return; }
      // Save new availble webpack dev port.
      appConfig.set(`devPort:${envName}`, port);
      const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      const urls = prepareUrls(protocol, HOST, port);

      const webpackconfig = getWebpackConfig();
      // const allEntries = webpackconfig.reduce((prev, curr) => {
      //   return Object.assign(prev, curr.entry);
      // }, {});
      // console.log('allEntries: ', allEntries);

      const compiler = createServeCompiler(webpackconfig, (success) => {
        if (success) {
          console.log('Compiler instance created successfully.');
          lunchNodeServer(port);
          compileMockServer();
        }
      });

      if (compiler === null) { return; }

      const proxySetting = appConfig.get('art:proxy');
      const proxyConfig = prepareProxy(proxySetting);

      const devServerConfig = webpackDevServeConfig(proxyConfig, urls.lanUrlForConfig);

      const devServer = new WebpackDevServer(compiler, devServerConfig);
      devServer.listen(port, HOST, (error) => {
        if (error) {
          return console.log(error);
        }
        console.log(cyanText(`Starting compilers to compiling modules hold on...\n`));
      });

      ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig as NodeJS.Signals, () => {
          devServer.close();
          process.exit();
        });
      });

    })
    .catch((error) => {
      if (error && error.message) {
        console.log(error.message);
      }
      process.exit(1);
    });
};

confirmModules(confirmModulesCb);