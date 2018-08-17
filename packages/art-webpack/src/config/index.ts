import { webpackEntries, webpackOutput, attachHotDevServerScripts } from './configWebpackModules';
import WebpackDevConfig from './webpack.config.dev';
import { isProd } from '../utils/env';
import { Configuration } from 'webpack';

export const getWebpackConfig = (): Configuration => {
  const entry = attachHotDevServerScripts(webpackEntries(false));
  const output = webpackOutput();

  // if (!isProd()) {
  return new WebpackDevConfig(entry, output);
  // }
};