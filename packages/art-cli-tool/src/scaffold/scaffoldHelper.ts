import { join, relative } from 'path';
import { parallel } from 'async';
import { SyncMapping } from './typing';
import { copy } from 'fs-extra';
import replace from 'replace';
import { printFileCopyLog } from './printLog';

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
      function (callback) {
        copy(tpl.fileFrom as string, tpl.fileTo as string)
          .then(() => {
            printFileCopyLog('.', process.cwd(), tpl.fileTo as string);
            callback(null);
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
          })
          .catch(callback);
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

export const tplMappingAssembler = (syncMapping: SyncMapping[], scaffoldFrom: string, scaffoldTo: string): SyncMapping[] => {
  syncMapping.forEach((mapping) => {
    const fileFrom = join(scaffoldFrom, mapping.name);
    const fileTo = join(scaffoldTo, mapping.rename || relative(scaffoldFrom, fileFrom));
    mapping.fileFrom = fileFrom;
    mapping.fileTo = fileTo;
  });

  return syncMapping;
};