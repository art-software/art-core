import { join, relative } from 'path';
import { parallel } from 'async';

/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 * 
 * @return Promise all distination file path.
 */
export const execCopyFilesTo = (filesFromCwd, filesFrom, dirCopyTo, fileHandler) => {
  const asyncQueue: any[] = [];

  filesFrom.forEach((cfgFile) => {
    asyncQueue.push(
      (callback) => {
        const copyTo = join(dirCopyTo, relative(filesFromCwd, cfgFile));
        fileHandler(cfgFile, copyTo, callback);
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

// export const getPathConfig = (fileDestPath, fileFromPath, scaffoldInstance) => {
//   const defaultConfig = {
//     fileFromPath,
//     renameTo: fileDestPath,
//     replaceOptions: { from: [], to: [] }
//   };

//   const scaffoldType = scaffoldInstance.scaffoldType;

// };

// export const copyFilesTo = ()