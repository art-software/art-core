import * as path from 'path';
import minimatch from 'minimatch';
import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';

/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 * 
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
export const getConfigEntries = (argvModules: string[]): object => {
  const appConfig = require(resolveAppPath('art.config.js'));
  const allModules = appConfig.webpack.entry;

  const newEntries = {};

  argvModules.forEach((moduleEntry) => {
    let modulePattern = path.join(moduleEntry.replace(/(\*)+$/ig, '').replace(/^client/, ''), '**/*.{js,jsx,ts,tsx}');
    modulePattern = ['./', path.join('client', modulePattern)].join('');

    for (const key in allModules) {
      const matched = minimatch.match(ensureHasDotExtension(allModules[key]), modulePattern, { matchBase: true });
      if (matched.length) {
        newEntries[key] = matched;
      }
    }
  });
  return newEntries;
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
