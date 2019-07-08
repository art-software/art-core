import { webpackEntries, webpackOutput, attachHotDevServerScripts, webpackEntriesSSR, webpackOutputSSR } from './configWebpackModules';
import WebpackDevConfigWeb from './webpack.config.dev.web';
import WebpackDevConfigSSR from './webpack.config.dev.ssr';
import { isProd } from '../utils/env';
import { Configuration } from 'webpack';
import WebpackProdConfig from './webpack.config.prod';

export const getWebpackConfigWeb = (moduleEntry: string): Configuration => {
  const entry = webpackEntries(moduleEntry, false);
  const hotEntry = attachHotDevServerScripts(entry);
  const output = webpackOutput(moduleEntry);

  if (!isProd()) {
    return new WebpackDevConfigWeb(hotEntry, output);
  } else {
    // TODO check it
    return new WebpackProdConfig(entry, output);
  }
};

export const getWebpackConfigSSR = (moduleEntry: string): Configuration => {
  const entry = webpackEntriesSSR(moduleEntry, false);
  const output = webpackOutputSSR(moduleEntry);

  if (!isProd()) {
  return new WebpackDevConfigSSR(entry, output);
  } else {
    // TODO check it
    return new WebpackProdConfig(entry, output);
  }
};