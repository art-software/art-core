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
    const allModules = appConfig.webpack.entry;
    if (Object.keys(allModules).length - modulesArr.length < 2) {
      this.doRemovePath('client', 'common');
    }
    for (const item of modulesArr) {
      const projectVirtualPath = appConfig.projectVirtualPath;
      const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
      this.doRemovePath('client', splitModuleName);
      this.doRemovePath('mock', splitModuleName);
      if (removeDebug) {
        this.doRemovePath('debug', item);
      }
      if (removePublic) {
        this.doRemovePath('public', item);
      }
    }
    updateArtConfigRemove(moduleEntry);
  };

  export const doRemovePath = (pathPre: string, pathNext: string) => {
    const commonPath = join(process.cwd(), pathPre, pathNext);
    removeSync(commonPath);
    console.log(`clear ${chalk.green(commonPath)} folder...`);
  };