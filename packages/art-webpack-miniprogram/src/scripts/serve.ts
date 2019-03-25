import chalk from 'chalk';
import inquirer from 'inquirer';
import appConfig from '../config/appConfig';
import { isWellStructuredClient } from '../utils/isWellStructuredClient';
import paths from '../config/paths';
import { join } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { readJSONSync, emptyDirSync } from 'fs-extra';
import choosePort from 'art-dev-utils/lib/choosePort';
import { getWebpackConfig } from '../config';
import { devServer } from '../compiler/devServer';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
const jsonFormat = require('json-format');

const PROJECTJSON = 'project.config.json';

const envName = appConfig.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig.get(`devPort:${envName}`);
// const isInteractive = process.stdout.isTTY;

const clearCacheInquire = (): Promise<{ clearCache: boolean }> => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'clearCache',
      default: false,
      message: `${chalk.cyan('=>')} Clear local cache ${chalk.magenta.bold('debug')} ?`
    }
  ]).then((answer: { clearCache: boolean }) => {
    return {
      clearCache: answer.clearCache
    };
  });
};

if (!isWellStructuredClient()) {
  throw new Error(`${chalk.red('Invalid miniprogram client structure')}`);
}

let nodeServerHasLunched = false;
const lunchNodeServer = (modules: string, port: number) => {

  if (nodeServerHasLunched) { return; }
  // if (isInteractive) { clearConsole(); }
  const mockServerPath = join(__dirname, '../../../art-server-mock/dist/index.js');
  const nodemonPath = join(require.resolve('nodemon'), '../../bin/nodemon.js');
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
    'tsc',
    '-p', `${paths.appMockServerConfig}`,
    '-w'
  );

  compileMockServerHasLunched = true;
};

clearCacheInquire().then((answer) => {
  if (answer.clearCache) {
    const virtualPath = require(paths.appArtConfig).projectVirtualPath || '';
    const debugOutputDir = join(paths.appDebug, virtualPath);
    if (existsSync(debugOutputDir)) {
      const debugProjectJSONPath = join(debugOutputDir, PROJECTJSON);
      let debugProjectConfigJSON;
      if (existsSync(debugProjectJSONPath)) {
        debugProjectConfigJSON = readJSONSync(debugProjectJSONPath);
      }

      // clear debug files
      emptyDirSync(debugOutputDir);
      console.log('cache cleared');

      if (debugProjectConfigJSON) {
        writeFileSync(debugProjectJSONPath, jsonFormat(debugProjectConfigJSON, {
          type: 'space',
          size: 2
        }));
      }
    }
  }

  choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
      if (port === null) {
        console.log('no avaliable port found');
        return;
      }

      // Save new availble webpack dev port.
      appConfig.set(`devPort:${envName}`, port);
      const webpackConfig = getWebpackConfig();
      const miniprogramDevServer = devServer(webpackConfig, answer.clearCache, () => {
        console.log('watch done........');
      });
      lunchNodeServer('', port - 1);
      compileMockServer();

      ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig as NodeJS.Signals, () => {
          miniprogramDevServer.close();
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
});