  import { join } from 'path';
  import { removeSync, readdirSync } from 'fs-extra';
  import chalk from 'chalk';
  import resolveAppPath from 'art-dev-utils/lib/resolveAppPath';
  import { printInstructions } from '../scaffold/printLog';
  const updateArtConfigRemove = require('../scaffold/react/updateArtConfigRemove');

  /**
   * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
   * @param {Object} moduleEntry  modules to be removed.  eg:{demo/spa/my/invest/22: ["./client/my/invest/22/index.tsx"]}
   * @param {Boolean} removeDebug remove debug path folders or not
   * @param {Boolean} removePublic remove public path folders or not
   */
  export const removeFolders = (moduleEntry: object, removeDebug: boolean, removePublic: boolean) => {
    const modulesArr = Object.keys(moduleEntry);
    const appConfig = require(resolveAppPath('art.config.js'));
    for (const item of modulesArr) {
      // item: 'demo/spa/my/invest/22'
      const { projectVirtualPath, projectType } = appConfig;
      const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
      remove('', 'client', splitModuleName);
      remove('', 'mock', splitModuleName);
      const folderSuffix = projectType === 'SSR' ? '-ssr' : '';
      if (removeDebug) {
        remove(projectVirtualPath, `debug${folderSuffix}`, item);
        // remove(projectVirtualPath, 'debug', item);
      }
      if (removePublic) {
        remove(projectVirtualPath, `public${folderSuffix}`, item);
      }
    }
    updateArtConfigRemove(moduleEntry);
  };
  /**
   * 
   * @param {String} projectVirtualPath 'demo/spa
   * @param paths 
   */
  export const remove = (projectVirtualPath: String, ...paths: string[]) => {
    const commonPath = join(process.cwd(), ...paths);
    removeSync(commonPath);
    printInstructions(`clear ${chalk.green(commonPath)} folder...`);
    // [ 'client', 'share', 'aa', '22' ]  [ 'debug', 'demo', 'spa', 'share', 'aa', '22' ]
    const pathList = commonPath.split(`${process.cwd()}/`)[1].split('/');
    let count = pathList.length - 2;
    if (projectVirtualPath) {
      count = pathList.length - 2 - projectVirtualPath.split('/').length;
    }
    for (let i = 0; i < count; i++) {
      const pathNext = pathList.slice(0, pathList.length - (i + 1));
      const emptyPath = join(process.cwd(), pathNext.join('/'));
      const consolePath = emptyPath.split(process.cwd())[1];
      try{
        const dirs = readdirSync(emptyPath);
        if (dirs.length < 1) {
          removeSync(emptyPath);
          console.log(`clear ${chalk.green(consolePath)} folder...`);
        } else {
          console.log(`${chalk.green(consolePath)} is not empty`);
          break;
        }
      } catch (err) {
        console.log(`read ${chalk.green(consolePath)} error...`);
      }
    }
  };