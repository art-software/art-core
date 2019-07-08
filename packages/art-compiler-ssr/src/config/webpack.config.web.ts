import { getWebpackConfigWeb } from './index';

const argv = process.argv;
const ART_MODULES = JSON.parse(
  argv[argv.indexOf('--ART_MODULES') + 1]
);

const config = ART_MODULES.map((moduleEntry) => {
  const webpackConfig = getWebpackConfigWeb(moduleEntry);
  return webpackConfig;
});

export default config;