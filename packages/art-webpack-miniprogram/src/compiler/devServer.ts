import { Configuration } from 'webpack';
import { MiniProgramCompiler } from './index';
import { miniprogramWebpackEntry } from '../config/miniprogramWebpackEntry';
import chokidar from 'chokidar';
import paths from '../config/paths';

export const devServer = (webpackConfig: Configuration, ignoreInitial: boolean, watcherDone: () => any) => {

  const watchPath = miniprogramWebpackEntry().entryValue;
  const miniprogramCompiler = new MiniProgramCompiler(webpackConfig);

  return chokidar.watch(watchPath, {
    cwd: paths.appCwd,
    ignoreInitial,
    ignored: /(^|[/\\])\../
  })
    .on('ready', miniprogramCompiler.ready(watcherDone))
    .on('add', miniprogramCompiler.add.bind(miniprogramCompiler));
};