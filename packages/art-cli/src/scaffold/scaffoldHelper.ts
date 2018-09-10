import { join, relative } from 'path';
import { parallel } from 'async';
import { merge } from 'lodash';
import { TplMapping } from './typing';
import { copy } from 'fs-extra';

/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 * 
 * @return Promise all distination file path.
 */
export const execCopyFilesTo = (tpls: TplMapping[]) => {
  const asyncQueue: any[] = [];

  tpls.forEach((tpl) => {
    if (tpl.operation === 'copy') {
      copy(tpl.from, tpl.to);
    }
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

export const tplHandler = (tplFiles: string[], scaffoldFrom: string, scaffoldTo: string, scaffoldInstance): TplMapping[] => {
  const tpl: TplMapping[] = [];

  tplFiles.forEach((fileName) => {
    const scaffoldType = scaffoldInstance.scaffoldType;
    const syncMapping = require(`./${scaffoldType}/syncMapping`);
    const from = `${scaffoldFrom}/${fileName}`;
    const to = join(scaffoldTo, relative(scaffoldFrom, from));

    const tplMapping = merge({
      name: fileName,
      from,
      to,
    }, syncMapping[fileName]);
    tpl.push(tplMapping);
  });

  return tpl;
};