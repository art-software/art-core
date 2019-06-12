import { isAtArtProjectRoot } from '../helpers/isAtArtProjectRoot';
import chalk from 'chalk';
import { FileNames } from '../constants/FileNames';
import { Stage } from '../enums/Stage';
import { join } from 'path';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';

export const npmUpdate = () => {

  if (!isAtArtProjectRoot()) {
    throw Error(chalk.red(`Cannot found "${FileNames.ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
  }

  const notArtPkgGlob = '!art-*';

  const bin = process.env.STAGE === Stage.dev ?
    join(__dirname, '../../../../node_modules/.bin/npm-check') :
    join(process.cwd(), 'node_modules/.bin/npm-check');

  executeNodeScript(
    bin,
    '--update',
    '--ignore', notArtPkgGlob,
    '--skip-unused'
  );
};