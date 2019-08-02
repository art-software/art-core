import { Configuration } from 'webpack';
import { webpackEntries, attachHotDevServerScripts, webpackOutput } from './configWebpackModules';
import { isProd } from '../utils/env';
import WebpackDevConfigWeb from './webpack.config.dev.web';
import WebpackProdConfigWeb from './webpack.config.prod.web';
import appConfig from '../config/appConfig';

const webpackConfigWeb = (moduleEntry: string): Configuration => {
  const entry = webpackEntries(moduleEntry, false);
  const hotEntry = attachHotDevServerScripts(entry);
  const output = webpackOutput(moduleEntry);

  if (!isProd()) {
    return new WebpackDevConfigWeb(hotEntry, output);
  } else {
    // TODO check it
    return new WebpackProdConfigWeb(entry, output);
  }
};

const argv = process.argv;
const ART_MODULES = JSON.parse(
  argv[argv.indexOf('--ART_MODULES') + 1] || appConfig.get('ART_MODULES')
);

const getWebpackConfigWeb = (): Configuration[] => {
  return ART_MODULES.map((moduleEntry) => {
    const webpackConfig = webpackConfigWeb(moduleEntry);
    return webpackConfig;
  });
};

export default getWebpackConfigWeb;