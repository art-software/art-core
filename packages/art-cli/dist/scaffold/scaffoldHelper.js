"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const async_1 = require("async");
const fs_extra_1 = require("fs-extra");
const replace_1 = __importDefault(require("replace"));
const printLog_1 = require("./printLog");
/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 *
 * @return Promise all distination file path.
 */
exports.execCopyFilesTo = (tplsMappping) => {
    const asyncQueue = [];
    tplsMappping.forEach((tpl) => {
        if (!tpl.fileFrom || !tpl.fileTo) {
            return;
        }
        // copy file and replace file content if replace option present
        asyncQueue.push(function (callback) {
            fs_extra_1.copy(tpl.fileFrom, tpl.fileTo)
                .then(() => {
                printLog_1.printFileCopyLog('.', process.cwd(), tpl.fileTo);
                callback(null);
                if (!tpl.replace || !tpl.replace.length) {
                    return;
                }
                tpl.replace.forEach((replaceMap) => {
                    replace_1.default({
                        regex: replaceMap.from,
                        replacement: replaceMap.to,
                        paths: [tpl.fileTo],
                        recursive: false,
                        silent: true
                    });
                });
            })
                .catch(callback);
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
exports.tplMappingAssembler = (syncMapping, scaffoldFrom, scaffoldTo) => {
    syncMapping.forEach((mapping) => {
        const fileFrom = path_1.join(scaffoldFrom, mapping.name);
        const fileTo = path_1.join(scaffoldTo, mapping.rename || path_1.relative(scaffoldFrom, fileFrom));
        mapping.fileFrom = fileFrom;
        mapping.fileTo = fileTo;
    });
    return syncMapping;
};
