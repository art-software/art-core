import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';

const paths = {
  appCwd: resolveAppPath(''),
  appPublic: resolveAppPath('public'),
  appPackageJson: resolveAppPath('package.json'),
  appSrc: resolveAppPath('client'),
  appServer: resolveAppPath('server'),
  appNodeModules: resolveAppPath('node_modules'),
  appArtConfig: resolveAppPath('venus.config.js'),
  appTsConfig: resolveAppPath('tsconfig.json'),
  appTsLintConfig: resolveAppPath('tslint.json')
};

export default paths;