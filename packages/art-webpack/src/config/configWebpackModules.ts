import appConfig from './appConfig';
import * as path from 'path';
import minimatch from 'minimatch';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import paths from './paths';
import { clone, forEach } from 'lodash';
import { isProd } from '../utils/env';
import { BuildEnv } from '../enums/BuildEnv';
import * as webpack from 'webpack';

const envName = appConfig.get('NODE_ENV');
const isProdEnv = isProd();
const projectVirtualPath = appConfig.get('art:projectVirtualPath') || '';

const getHotDevServerScripts = () => {
  // WEBPACK DEV SERVER PORT
  const host = ensureSlash(appConfig.get(`devHost:${envName}`), false);
  const port = appConfig.get(`devPort:${envName}`);

  return [
    '' +
    'webpack-dev-server/client?' + host + ':' + port + '/',
    'webpack/hot/dev-server'
  ];
};

export const attachHotDevServerScripts = (entries) => {
  const hotMiddlewareScript = getHotDevServerScripts();
  const newEntries = clone(entries);

  forEach(entries || {}, (value, key) => {
    newEntries[key] = hotMiddlewareScript.concat(newEntries[key]);
  });

  return newEntries;
};

/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 * 
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
export const webpackEntries = (moduleName: string, keepQuery: boolean): object => {
  const allModules = appConfig.get('art:webpack:entry');

  const newEntries = {};

  console.log('moduleName: ', moduleName);
  let modulePattern = path.join(moduleName.replace(/(\*)+$/ig, '').replace(/^client/, ''), '**/*.{js,jsx,ts,tsx}');
  modulePattern = ['./', path.join('client', modulePattern)].join('');

  for (const key in allModules) {
    const matched = minimatch.match(ensureHasDotExtension(allModules[key]), modulePattern, { matchBase: true });
    if (matched.length) {
      newEntries[keepQuery ? key : key.split('?')[0]] = [path.join(__dirname, './polyfills')].concat(matched);
      return newEntries;
    }
  }

  return newEntries;
};

/**
 * Get webpack `output` element configuration
 */
export const webpackOutput = (moduleEntry: string): webpack.Output => {
  const buildEnv = appConfig.get('BUILD_ENV');
  const host = ensureSlash(appConfig.get(`devHost:${envName}`), false);
  const port = appConfig.get(`devPort:${envName}`);
  const output = appConfig.get(`art:webpack:output`) || {};
  const publicPath = isProdEnv ? output[`${buildEnv}PublicPath`] : `${host}:${port}/public/`;

  const outRelativePath = buildEnv === BuildEnv.prod ? './public/' : './debug/';
  return {
    filename: `[name]/${bundleFileNamePattern('.js')}`,
    chunkFilename: `${projectVirtualPath}/${moduleEntry}/[id].[chunkhash].js`,
    path: path.resolve(paths.appCwd, outRelativePath),
    publicPath
  };
};

/**
 * ensure each file path of entry points has specificed file extension
 * .(js|jsx|ts|tsx) if not default is /index.js
 * @param {Array} files entry points
 */
const ensureHasDotExtension = (files: string[]): string[] => {
  return files.map((filePath) => {
    if (!path.extname(filePath)) {
      return ['./', path.join(filePath, 'index.js')].join('');
    } else {
      return filePath;
    }
  });
};

const bundleFileNamePattern = (suffix: string = '.js'): string => {
  const enableBundleHashName = appConfig.get('art:enableBundleHashName');
  const version = appConfig.get('art:version');
  if (!isProdEnv) {
    return `bundle${suffix}`;
  }
  if (enableBundleHashName) {
    return `bundle[chunkhash]${suffix}`;
  }
  return `bundle${suffix}?${version}`;
};