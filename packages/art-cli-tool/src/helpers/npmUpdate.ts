import { isAtArtProjectRoot } from '../helpers/isAtArtProjectRoot';
import chalk from 'chalk';
import { FileNames } from '../constants/FileNames';
import { Stage } from '../enums/Stage';
import { join } from 'path';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import { existsSync } from 'fs';

export const npmUpdate = () => {

  if (!isAtArtProjectRoot()) {
    throw Error(chalk.red(`Cannot found "${FileNames.ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
  }

  const notArtPkgGlob = '!art-*';

  let bin;
  if (process.env.STAGE === Stage.dev) {
    bin = join(__dirname, '../../../../node_modules/.bin/npm-check');
  } else {
    const npmCheckPathOne = join(__dirname, '../../../npm-check/bin/cli.js');
    const npmCheckPathTwo = join(__dirname, '../../node_modules/.bin/npm-check');
    if (existsSync(npmCheckPathOne)) {
      bin = npmCheckPathOne;
    } else if (existsSync(npmCheckPathTwo)) {
      bin = npmCheckPathTwo;
    } else {
      throw new Error('No npm-check package found globally');
    }
  }

  executeNodeScript(
    bin,
    '--update',
    '--ignore', notArtPkgGlob,
    '--skip-unused'
  );
};