import { Configuration } from 'webpack';
import { webpackEntries, webpackOutput } from './configWebpackModules';
import { isProd } from '../utils/env';
import WebpackDevConfig from './webpack.config.dev';
import WebpackProdConfig from './webpack.config.prod';

export const getWebpackConfig = (): Configuration => {
  const entry = webpackEntries();
  const output = webpackOutput();

  if (!isProd()) {
    return new WebpackDevConfig(entry, output);
  } else {
    return new WebpackProdConfig(entry, output);
  }
};