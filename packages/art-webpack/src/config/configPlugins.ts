import { Tapable } from '../../../../node_modules/@types/tapable';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from './paths';

export const configPlugins: Tapable.Plugin[] = [
  new ProgressBarPlugin({
    format: chalk.cyan('build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    clear: false
  }),

  new ForkTsCheckerWebpackPlugin({
    tsconfig: paths.appTsConfig,
    tslint: paths.appTsLintConfig
  })
];