  import { join } from 'path';
  import { removeSync } from 'fs-extra';
  import chalk from 'chalk';
  import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';
  const updateArtConfigRemove = require('../scaffold/react/updateArtConfigRemove');

  /**
   * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
   * @param {Object} moduleEntry  modules to be removed
   * @param {Boolean} removeDebug remove debug path folders or not
   * @param {Boolean} removePublic remove public path folders or not
   */
  export const removeFolders = (moduleEntry, removeDebug: boolean, removePublic: boolean) => {
    const modulesArr = Object.keys(moduleEntry);
    const appConfig = require(resolveAppPath('art.config.js'));
    for (const item of modulesArr) {
      const projectVirtualPath = appConfig.projectVirtualPath;
      const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
      remove('client', splitModuleName);
      remove('mock', splitModuleName);
      if (removeDebug) {
        remove('debug', item);
      }
      if (removePublic) {
        remove('public', item);
      }
    }
    updateArtConfigRemove(moduleEntry);
  };

  export const remove = (...paths: string[]) => {
    const commonPath = join(process.cwd(), ...paths);
    removeSync(commonPath);
    console.log(`clear ${chalk.green(commonPath)} folder...`);
  };