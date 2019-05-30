import { MiniProgramCompiler } from './index';
import chokidar from 'chokidar';
import paths from '../config/paths';
import chalk from 'chalk';

export const devServer = (ignoreInitial: boolean, watcherDone: () => any) => {

  const watchPath = paths.appSrc;
  const miniprogramCompiler = new MiniProgramCompiler();

  return chokidar.watch(watchPath, {
    cwd: paths.appCwd,
    ignoreInitial,
    ignored: /(^|[/\\])\../
  })
    .on('ready', miniprogramCompiler.ready(watcherDone))
    .on('add', miniprogramCompiler.add)
    .on('unlink', miniprogramCompiler.remove) // TODO remove empty folders when all containing files deleted
    .on('change', miniprogramCompiler.change)
    .on('error', (err) => {
      console.log(`${chalk.red('File system watch error:')} ${err}`);
    });
};