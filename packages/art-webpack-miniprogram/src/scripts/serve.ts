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
    process.env.STAGE === 'dev' ? '../../node_modules/.bin/tsc' : '../../../.bin/tsc',
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

  const miniprogramDevServer = devServer(!answer.clearCache, () => {
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

});