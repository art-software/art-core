import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';

const paths = {
  appCwd: resolveAppPath(''),
  appSrc: resolveAppPath('client'),
  appDebug: resolveAppPath('debug'),
  appPublic: resolveAppPath('public'),
  appPackageJson: resolveAppPath('package.json'),
  appMockServer: resolveAppPath('mock'),
  appMockServerConfig: resolveAppPath('tsconfig-mock.json'),
  appNodeModules: resolveAppPath('node_modules'),
  appArtConfig: resolveAppPath('art.config.js'),
  appTsConfig: resolveAppPath('tsconfig.json'),
  appTsLintConfig: resolveAppPath('tslint.json')
};

export default paths;