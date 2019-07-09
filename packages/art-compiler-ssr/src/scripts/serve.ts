import { confirmModules } from '../utils/inquirer';
import appConfig from '../config/appConfig';
import choosePort from 'art-dev-utils/lib/choosePort';
import webpackDevServeConfig from '../config/webpackDevServer';
import createServeCompiler from '../utils/createServeCompiler';
import prepareProxy from 'art-dev-utils/lib/prepareProxy';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
import WebpackDevServer from 'webpack-dev-server';
// import clearConsole from 'art-dev-utils/lib/clearConsole';
import { cyanText, greenText, warningText } from 'art-dev-utils/lib/chalkColors';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import * as path from 'path';
import paths from '../config/paths';
import formatWebpackMessages from 'art-dev-utils/lib/formatWebpackMessages';
import webpackConfigWeb from '../config/webpack.config.web';
import webpack from 'webpack';

const envName = appConfig.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig.get(`devPort:${envName}`);
// const isInteractive = process.stdout.isTTY;

let nodeServerHasLunched = false;
const lunchNodeServer = (modules: string, port: number) => {

  if (nodeServerHasLunched) { return; }
  // if (isInteractive) { clearConsole(); }
  const mockServerPath = path.join(__dirname, '../../../art-server-mock/dist/index.js');
  const nodemonPath = path.join(require.resolve('nodemon'), '../../bin/nodemon.js');
  executeNodeScript(
    nodemonPath,
    '--watch', paths.appMockServer,
    '--ignore', paths.appMockServer,
    '-e', 'js, jsx, ts',
    mockServerPath,
    '--ART_MODULES', `${JSON.stringify(modules)}`,
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

      const argvModules: string = appConfig.get('ART_MODULES') || '[]';

      const parallelWebpack = path.join(require.resolve('parallel-webpack'), '../bin/run.js');
      const configPathSSR = path.join(__dirname, '../config/webpack.config.ssr.js');
      executeNodeScript(
        parallelWebpack,
        '--config', configPathSSR,
        '--watch',
        '--',
        '--ART_MODULES', `${argvModules}`
      );

      const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      const urls = prepareUrls(protocol, HOST, port);
      const proxySetting = appConfig.get('art:proxy');
      const proxyConfig = prepareProxy(proxySetting);
      const devServerConfig = webpackDevServeConfig(proxyConfig, urls.lanUrlForConfig);
      const compiler = webpack(webpackConfigWeb);
      const devServer = new WebpackDevServer(compiler, devServerConfig);

      console.log('port: ', port);
      devServer.listen(port, HOST, (error) => {
        if (error) {
          return console.log(error);
        }
        console.log(cyanText(`Starting compilers to compiling modules hold on...\n`));
      });

      compileMockServer();
      lunchNodeServer(argvModules, port);

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