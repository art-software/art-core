import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';

const paths = {
  appCwd: resolveAppPath(''),
  appPublic: resolveAppPath('public'),
  appDebug: resolveAppPath('debug'),
  appPackageJson: resolveAppPath('package.json'),
  appSrc: resolveAppPath('client'),
  appMockServer: resolveAppPath('mock'),
  appMockServerConfig: resolveAppPath('tsconfig-mock.json'),
  appNodeModules: resolveAppPath('node_modules'),
  appArtConfig: resolveAppPath('art.config.js'),
  appTsConfig: resolveAppPath('tsconfig.json'),
  appTsLintConfig: resolveAppPath('tslint.json')
};

export default paths;