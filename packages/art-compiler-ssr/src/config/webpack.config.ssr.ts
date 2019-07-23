import { Configuration } from 'webpack';
import { webpackEntriesSSR, webpackOutputSSR } from './configWebpackModules';
import { isProd } from '../utils/env';
import WebpackDevConfigSSR from './webpack.config.dev.ssr';
import WebpackProdConfigSSR from './webpack.config.prod.ssr';
import appConfig from '../config/appConfig';

const getWebpackConfigSSR = (moduleEntry: string): Configuration => {
  const entry = webpackEntriesSSR(moduleEntry, false);
  const output = webpackOutputSSR(moduleEntry);

  if (!isProd()) {
    return new WebpackDevConfigSSR(entry, output);
  } else {
    // TODO check it
    return new WebpackProdConfigSSR(entry, output);
  }
};

const argv = process.argv;
const ART_MODULES = JSON.parse(
  argv[argv.indexOf('--ART_MODULES') + 1] || appConfig.get('ART_MODULES')
);
console.log('ART_MODULES: ', ART_MODULES);

const webpackConfigSSR = ART_MODULES.map((moduleEntry) => {
  const webpackConfig = getWebpackConfigSSR(moduleEntry);
  return webpackConfig;
});

export default webpackConfigSSR;