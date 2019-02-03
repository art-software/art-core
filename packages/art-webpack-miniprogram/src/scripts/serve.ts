import chalk from 'chalk';
import inquirer from 'inquirer';
import { isWellStructuredClient } from '../utils/isWellStructuredClient';
import paths from '../config/paths';
import { join } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { readJSONSync, emptyDirSync } from 'fs-extra';
const jsonFormat = require('json-format');
const PROJECTJSON = 'project.config.json';

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

  console.log('choice a serve port');
});