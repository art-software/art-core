"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const async_1 = require("async");
/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 *
 * @return Promise all distination file path.
 */
exports.execCopyFilesTo = (filesFromCwd, filesFrom, dirCopyTo, fileHandler) => {
    const asyncQueue = [];
    filesFrom.forEach((cfgFile) => {
        asyncQueue.push((callback) => {
            const copyTo = path_1.join(dirCopyTo, path_1.relative(filesFromCwd, cfgFile));
            fileHandler(cfgFile, copyTo, callback);
        });
    });
    return new Promise((resolve, reject) => {
        async_1.parallel(asyncQueue, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
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
