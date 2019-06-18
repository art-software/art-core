import { isAtArtProjectRoot } from '../helpers/isAtArtProjectRoot';
import chalk from 'chalk';
import { FileNames } from '../constants/FileNames';
import { Stage } from '../enums/Stage';
import { join } from 'path';
import { existsSync } from 'fs';
import spawn from 'cross-spawn';
import preferredPm from 'preferred-pm';

export const npmUpdate = () => {

  if (!isAtArtProjectRoot()) {
    throw Error(chalk.red(`Cannot found "${FileNames.ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
  }

  const notArtPkgGlob = '!art-*';

  let bin;
  if (process.env.STAGE === Stage.dev) {
    bin = join(__dirname, '../../../../node_modules/.bin/npm-check');
  } else {
    const npmCheckPathOne = join(__dirname, '../../../npm-check-support-yarn/bin/cli.js');
    const npmCheckPathTwo = join(__dirname, '../../node_modules/npm-check-support-yarn/bin/cli.js');
    if (existsSync(npmCheckPathOne)) {
      bin = npmCheckPathOne;
    } else if (existsSync(npmCheckPathTwo)) {
      bin = npmCheckPathTwo;
    } else {
      throw new Error('No npm-check package found globally');
    }
  }

  preferredPm(process.cwd())
    .then((pm) => {
      const pmName = pm.name;
      const env = Object.create( process.env );
      env.UPDATE_INSTALLER = pmName;
      const child = spawn(
        bin,
        [
          '--update',
          '--ignore', notArtPkgGlob,
          '--skip-unused'
        ],
        {
          stdio: 'inherit',
          env
        }
      );

      child.on('close', (code) => {
        if (code !== 0) {
          console.log();
          console.log(chalk.cyan('Art dependencies update') + ' exited with code ' + code + '.');
          console.log();
          return;
        }
      });

      child.on('error', (err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(chalk.red('Package manage detection error: '), err);
    });
};