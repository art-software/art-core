import paths from '../config/paths';
import wxappDefaultProjectConfig from '../config/wxappDefaultProjectConfig.json';
import { extend } from 'lodash';
import { existsSync, writeFileSync } from 'fs';
import chalk from 'chalk';
import jsonFormat from 'json-format';
import { PROJECTCONFIG } from '../constants/FileNames';
const packageJSON = require(paths.appPackageJson);

export const compileProjectConfig = (options: { build?: boolean, projectConfigPath: string }) => {
  const { name, appid } = packageJSON;
  const projectConfig = extend({}, wxappDefaultProjectConfig, {
    appid,
    projectname: options.build ? name + '-build' : name
  });

  return new Promise((resolve) => {
    if (existsSync(options.projectConfigPath)) {
      console.log(`${chalk.blue('=>')} File ${chalk.cyan(`${PROJECTCONFIG}`)} has existed`);
      resolve();
    } else {
      writeFileSync(options.projectConfigPath, jsonFormat(projectConfig, {
        type: 'space',
        size: 2
      }), { encoding: 'utf8' });
      console.log(`${chalk.blue('=>')} File ${chalk.cyan(`${PROJECTCONFIG}`)} has created`);
      resolve();
    }
  });
};