import { confirmModules } from '../utils/inquirer';
import appConfig from '../config/appConfig';
import choosePort from 'art-dev-utils/lib/choosePort';
import webpackDevServeConfig from '../config/webpackDevServer';
import createServeCompiler from '../utils/createServeCompiler';
import { getWebpackConfigWeb, getWebpackConfigSSR } from '../config';
import prepareProxy from 'art-dev-utils/lib/prepareProxy';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
import WebpackDevServer from 'webpack-dev-server';
// import clearConsole from 'art-dev-utils/lib/clearConsole';
import { cyanText, greenText, warningText } from 'art-dev-utils/lib/chalkColors';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import * as path from 'path';
import paths from '../config/paths';
import formatWebpackMessages from 'art-dev-utils/lib/formatWebpackMessages';

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

// let compileMockServerHasLunched = false;
// const compileMockServer = () => {

//   if (compileMockServerHasLunched) { return; }

//   executeNodeScript(
//     process.env.STAGE === 'dev' ?
//     '../../node_modules/.bin/tsc' :
//     path.join(process.cwd(), 'node_modules/.bin/tsc'),
//     '-p', `${paths.appMockServerConfig}`,
//     '-w'
//   );

//   compileMockServerHasLunched = true;
// };

const confirmModulesCb = (answer) => {
  if (answer.availableModulesOk === false) { return; }
  choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
      if (port === null) { return; }
      // Save new availble webpack dev port.
      appConfig.set(`devPort:${envName}`, port);
      const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      const urls = prepareUrls(protocol, HOST, port);

      const webpackConfigWeb = getWebpackConfigWeb();
      const webpackConfigSSR = getWebpackConfigSSR();

      const webCompiler = createServeCompiler(webpackConfigWeb, (success) => {
        if (success) {
          console.log('Web Compiler instance created successfully.');
          const artModules = appConfig.get('ART_MODULES');
          lunchNodeServer(artModules, port);
          // compileMockServer();
        }
      });

      const ssrCompiler = createServeCompiler(webpackConfigSSR, (success) => {
        if (success) {
          console.log('SSR Compiler instance created successfully.');
        }
      });

      if (webCompiler === null || ssrCompiler === null) { return; }

      ssrCompiler.watch({
        ignored: /node_modules/,
        aggregateTimeout: 2000
      }, (err, stats) => {
        const messages = formatWebpackMessages(stats.toJson({}));
        const noErrors = !messages.errors.length;

        if (noErrors) {
          console.log(greenText('SSR compiled successfully!'));
        } else {
          console.log(warningText('Debug server was interrupted, please fix lint error!\nFailed to compile.\n'));
          console.log(messages.errors.join('\n\n'));
          return;
        }
      });

      const proxySetting = appConfig.get('art:proxy');
      const proxyConfig = prepareProxy(proxySetting);

      const devServerConfig = webpackDevServeConfig(proxyConfig, urls.lanUrlForConfig);

      const devServer = new WebpackDevServer(webCompiler, devServerConfig);
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