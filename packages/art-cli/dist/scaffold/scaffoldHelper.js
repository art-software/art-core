"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const async_1 = require("async");
const lodash_1 = require("lodash");
const fs_extra_1 = require("fs-extra");
/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 *
 * @return Promise all distination file path.
 */
exports.execCopyFilesTo = (tpls) => {
    const asyncQueue = [];
    tpls.forEach((tpl) => {
        if (tpl.operation === 'copy') {
            fs_extra_1.copy(tpl.from, tpl.to);
        }
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
exports.tplHandler = (tplFiles, scaffoldFrom, scaffoldTo, scaffoldInstance) => {
    const tpl = [];
    tplFiles.forEach((fileName) => {
        const scaffoldType = scaffoldInstance.scaffoldType;
        const syncMapping = require(`./${scaffoldType}/syncMapping`);
        const from = `${scaffoldFrom}/${fileName}`;
        const to = path_1.join(scaffoldTo, path_1.relative(scaffoldFrom, from));
        const tplMapping = lodash_1.merge({
            name: fileName,
            from,
            to,
        }, syncMapping[fileName]);
        tpl.push(tplMapping);
    });
    return tpl;
};
