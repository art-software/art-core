import { join } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';

const ARTCONFIGFILE = 'art.config.js';
const artConfigFilePath =  join(process.cwd(), ARTCONFIGFILE);

export const getProjectType = () => {
  if (!existsSync(artConfigFilePath)) {
    throw Error(chalk.red(`Cannot found "${ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
  }

  const artConfig = require(artConfigFilePath) || {};
  return artConfig.projectType || '';
};