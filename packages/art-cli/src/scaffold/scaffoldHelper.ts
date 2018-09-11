import { join, relative } from 'path';
import { parallel } from 'async';
import { SyncMapping } from './typing';
import { copy } from 'fs-extra';
import replace from 'replace';

/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 * 
 * @return Promise all distination file path.
 */
export const execCopyFilesTo = (tplsMappping: SyncMapping[]) => {
  const asyncQueue: any[] = [];

  tplsMappping.forEach((tpl) => {
    if (!tpl.fileFrom || !tpl.fileTo) { return; }
    // copy file and replace file content if replace option present
    asyncQueue.push(
      () => {
        copy(tpl.fileFrom as string, tpl.fileTo as string, () => {
          if (!tpl.replace || !tpl.replace.length) { return; }
          tpl.replace.forEach((replaceMap) => {
            replace({
              regex: replaceMap.from,
              replacement: replaceMap.to,
              paths: [tpl.fileTo],
              recursive: false,
              silent: true
            });
          });
        });
      }
    );
  });

  return new Promise((resolve, reject) => {
    parallel(asyncQueue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const tplMappingAssembler = (scaffoldFrom: string, scaffoldTo: string, scaffoldInstance): SyncMapping[] => {

  const scaffoldType = scaffoldInstance.scaffoldType;
  const syncMapping: SyncMapping[] = require(`./${scaffoldType}/syncMapping`)(scaffoldInstance);

  syncMapping.forEach((mapping) => {
    const fileFrom = `${scaffoldFrom}/${mapping.name}`;
    const fileTo = join(scaffoldTo, mapping.rename || relative(scaffoldFrom, fileFrom));
    mapping.fileFrom = fileFrom;
    mapping.fileTo = fileTo;
  });

  return syncMapping;
};