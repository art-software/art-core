import chalk from 'chalk';
import inquirer from 'inquirer';
import appConfig from '../config/appConfig';
import { isWellStructuredClient } from '../utils/isWellStructuredClient';
import paths from '../config/paths';
import { join } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { readJSONSync, emptyDirSync } from 'fs-extra';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import { devServer } from '../compiler/devServer';
const jsonFormat = require('json-format');
import * as fs from 'fs';

const PROJECTJSON = 'project.config.json';
const PORT = appConfig.get('PORT');

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

isWellStructuredClient();

let nodeServerHasLunched = false;
const lunchNodeServer = () => {

  if (nodeServerHasLunched) { return; }

  const nodemonPath = join(require.resolve('nodemon'), '../../bin/nodemon.js');
  const mockServerPath = join(__dirname, './startMockServer.js');
  PORT ?
    executeNodeScript(
      nodemonPath,
      '--watch', paths.appMockServer,
      '--ignore', paths.appMockServer,
      '-e', 'js, jsx, ts',
      mockServerPath,
      '--PORT', PORT
    ) :
    executeNodeScript(
      nodemonPath,
      '--watch', paths.appMockServer,
      '--ignore', paths.appMockServer,
      '-e', 'js, jsx, ts',
      mockServerPath
    );
  nodeServerHasLunched = true;
};

let compileMockServerHasLunched = false;
const compileMockServer = () => {

  if (compileMockServerHasLunched) { return; }

  executeNodeScript(
    process.env.STAGE === 'dev' ?
      '../../node_modules/.bin/tsc' :
      join(process.cwd(), 'node_modules/.bin/tsc'),
    '-p', `${paths.appMockServerConfig}`,
    '-w'
  );

  compileMockServerHasLunched = true;
};

const clearCacheAction = (clearCacheStatus: boolean, debugOutputDir: string) => {
  if (clearCacheStatus) {
    // const virtualPath = require(paths.appArtConfig).projectVirtualPath || '';
    // const debugOutputDir = join(paths.appDebug, virtualPath);
    existsSync(debugOutputDir);
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
  const miniprogramDevServer = devServer(!clearCacheStatus, () => {
    compileMockServer();
    lunchNodeServer();
    console.log('Initial compilation complete, watching for changes........');
  });
  ['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig as NodeJS.Signals, () => {
      miniprogramDevServer.close();
      process.exit();
    });
  });
};

const startProjectServe = () => {
  // judge is first serve
  const virtualPath = require(paths.appArtConfig).projectVirtualPath || '';
  const debugOutputDir = join(paths.appDebug, virtualPath);
  const isFirstServe = !fs.existsSync(debugOutputDir);
  if (isFirstServe) {
    console.log(chalk.green(`\nThis is your first start serve, it will compile your files\n`));
    clearCacheAction(true, debugOutputDir);
    return;
  }

  clearCacheInquire().then((answer) => {
    clearCacheAction(answer.clearCache, debugOutputDir);
  });
};

startProjectServe();