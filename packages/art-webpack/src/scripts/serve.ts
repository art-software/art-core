import { confirmModules } from '../utils/inquirer';
import appConfig from '../config/appConfig';
import choosePort from 'art-dev-utils/lib/choosePort';
import webpackServe from '../config/webpackDevServer';
import createCompiler from '../utils/createCompiler';
import { getWebpackConfig } from '../config';

const envName = appConfig.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig.get(`devPort:${envName}`);

function confirmModulesCb(answer) {
  console.log(`your answer: `, answer);
  if (answer.availableModulesOk === false) { return; }
  choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
      if (port === null) { return; }
      // Save new availble webpack dev port.
      appConfig.set(`devPort:${envName}`, port);

      const webpackconfig = getWebpackConfig();
      const compiler = createCompiler(webpackconfig, (success) => {
        if (success) {
          console.log('done');
        }
      });

      if (compiler === null) { return; }

      webpackServe(compiler, (result) => {
        console.log(`start webpack serve success`);
      });
    })
    .catch((error) => {
      if (error && error.message) {
        console.log(error.message);
      }
      process.exit(1);
    });
}

confirmModules(confirmModulesCb);