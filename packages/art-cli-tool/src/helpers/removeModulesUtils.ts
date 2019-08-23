  import appConfig from '../config/appConfig';
  import { join } from 'path';
  import { removeSync } from 'fs-extra';
  import chalk from 'chalk';
  const updateArtConfigRemove = require('../scaffold/react/updateArtConfigRemove');

  /**
   * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
   * @param {Object} moduleEntry  modules to be removed
   * @param {Boolean} removeDebug remove debug path folders or not
   * @param {Boolean} removePublic remove public path folders or not
   */
  export const removeFolders = (moduleEntry, removeDebug: boolean, removePublic: boolean) => {
    const modulesArr = Object.keys(moduleEntry);
    const allModules = appConfig.stores.file.file.webpack.entry;
    for (const item of modulesArr) {
      const projectVirtualPath = appConfig.stores.file.file.projectVirtualPath;
      const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
      this.doRemovePath('client', splitModuleName);
      this.doRemovePath('mock', splitModuleName);
      if (allModules.length < 2) {
        this.doRemovePath('client', 'common');
      }
      if (removeDebug) {
        this.doRemovePath('debug', item);
      }
      if (removePublic) {
        this.doRemovePath('public', item);
      }
      updateArtConfigRemove(moduleEntry);
    }
  };

  export const doRemovePath = (pathPre: string, pathNext: string) => {
    const commonPath = join(process.cwd(), pathPre, pathNext);
    removeSync(commonPath);
    console.log(`clear ${chalk.green(commonPath)} folder...`);
  };