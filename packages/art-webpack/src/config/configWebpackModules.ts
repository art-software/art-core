import appConfig from './appConfig';
import * as path from 'path';
import minimatch from 'minimatch';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import paths from './paths';

interface OutputProps {
  filename: string;
  chunkFilename: string;
  path: string;
  publicPath: string;
}

const envName = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production';

/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 * 
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
export const webpackEntries = (keepQuery: boolean): object => {

  let argvModules: string[] =  JSON.parse(appConfig.get('ART_MODULES') || '[]');
  const allModules = appConfig.get('art:webpack:entry');

  if (!argvModules.length) { argvModules = ['**']; }

  const newEntries = {};

  argvModules.forEach((moduleEntry) => {
    let modulePattern = path.join(moduleEntry.replace(/(\*)+$/ig, '').replace(/^client/, ''), '**/*.{js,jsx,ts,tsx}');
    modulePattern = ['./', path.join('client', modulePattern)].join('');

    for (const key in allModules) {
      const matched = minimatch.match(ensureHasDotExtension(allModules[key]), modulePattern, { matchBase: true });
      console.log(`matched: ${matched}`);
      if (matched.length) {
        newEntries[keepQuery ? key : key.split('?')[0]] = ['polyfills'].concat(matched);
      }
    }
  });

  return newEntries;
};

/**
 * Get webpack `output` element configuration
 */
export const webpackOutput = (): OutputProps => {
  const host =  ensureSlash(appConfig.get(`devHost:${envName}`), false);
  const port = appConfig.get(`devPort:${envName}`);
  const output = appConfig.get(`art:webpack:output`) || {};
  const publicPath = isProd ? output.publicPath : `${host}:${port}/public/`;

  return {
    filename: `[name]/${bundleFileNamePattern('.js')}`,
    chunkFilename: `_chunks/[id].[chunkhash].js`,
    path: path.resolve(paths.appCwd, './public'),
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
  if (!isProd) {
    return `bundle${suffix}`;
  }
  if (enableBundleHashName) {
    return `bundle[chunkhash]${suffix}`;
  }
  return `bundle${suffix}?${version}`;
};