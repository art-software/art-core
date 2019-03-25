import { join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import { FileNames } from '../constants/FileNames';

const artConfigFilePath =  join(process.cwd(), FileNames.ARTCONFIGFILE);

export const getProjectType = () => {
  if (!existsSync(artConfigFilePath)) {
    throw Error(chalk.red(`Cannot found "${FileNames.ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
  }

  const artConfig = require(artConfigFilePath) || {};
  return artConfig.projectType || '';
};