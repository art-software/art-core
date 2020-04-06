import * as path from 'path';

const PACKAGE_ROOT = path.join(__dirname, '../packages');

const PACKAGES = [
  // 'art-cli-tool',
  // 'art-compiler-ssr',
  // 'art-dev-utils',
  // 'art-lib-common',
  // 'art-lib-common-miniprogram',
  // 'art-lib-react',
  // 'art-lib-utils',
  // 'art-lib-utils-wx',
  // 'art-server-mock',
  // 'art-server-mock-miniprogram',
  // 'art-ssr',
  // 'art-ssr-aggregator-node',
  // 'art-ssr-react',
  'art-ssr-react-router',
  // 'art-ssr-render',
  // 'art-ssr-vue',
  // 'art-tools',
  // 'art-webpack',
  // 'art-webpack-miniprogram'
];

const PACKAGES_PATH = PACKAGES.map((packageName: string) => {
  return path.join(PACKAGE_ROOT, packageName);
});

export { PACKAGES, PACKAGE_ROOT, PACKAGES_PATH }