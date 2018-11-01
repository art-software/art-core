import { webpackEntries, webpackOutput, attachHotDevServerScripts } from './configWebpackModules';
import WebpackDevConfig from './webpack.config.dev';
import { isProd } from '../utils/env';
import { Configuration } from 'webpack';
import WebpackProdConfig from './webpack.config.prod';

export const getWebpackConfig = (): Configuration => {
  const entry = webpackEntries(false);
  const hotEntry = attachHotDevServerScripts(entry);
  const output = webpackOutput();

  if (!isProd()) {
    return new WebpackDevConfig(hotEntry, output);
  } else {
    const config = new WebpackProdConfig(entry, output);
    console.log(JSON.stringify(config));
    return new WebpackProdConfig(entry, output);
  }
};