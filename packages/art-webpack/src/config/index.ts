import { webpackEntries, webpackOutput, attachHotDevServerScripts } from './configWebpackModules';
import WebpackDevConfig from './webpack.config.dev';
import { isProd } from '../utils/env';
import { Configuration } from 'webpack';
import WebpackProdConfig from './webpack.config.prod';
import appConfig from '../config/appConfig';

const webpackConfig = (moduleEntry: string): Configuration => {
  const entry = webpackEntries(moduleEntry, false);
  const hotEntry = attachHotDevServerScripts(entry);
  const output = webpackOutput(moduleEntry);

  if (!isProd()) {
    return new WebpackDevConfig(hotEntry, output);
  } else {
    return new WebpackProdConfig(entry, output);
  }
};

const argv = process.argv;
const ART_MODULES = JSON.parse(
  argv[argv.indexOf('--ART_MODULES') + 1] || appConfig.get('ART_MODULES')
);

export const getWebpackConfig = (): Configuration[] => {
  return ART_MODULES.map((moduleEntry) => {
    return webpackConfig(moduleEntry);
  });
};