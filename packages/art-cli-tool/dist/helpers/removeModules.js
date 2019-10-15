"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk_1 = __importDefault(require("chalk"));
const resolveAppPath_1 = __importDefault(require("art-dev-utils/lib/resolveAppPath"));
const printLog_1 = require("../scaffold/printLog");
const updateArtConfigRemove = require('../scaffold/react/updateArtConfigRemove');
/**
 * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
 * @param {Object} moduleEntry  modules to be removed.  eg:{demo/spa/my/invest/22: ["./client/my/invest/22/index.tsx"]}
 * @param {Boolean} removeDebug remove debug path folders or not
 * @param {Boolean} removePublic remove public path folders or not
 */
exports.removeFolders = (moduleEntry, removeDebug, removePublic) => {
    const modulesArr = Object.keys(moduleEntry);
    const appConfig = require(resolveAppPath_1.default('art.config.js'));
    for (const item of modulesArr) {
        // item: 'demo/spa/my/invest/22'
        const { projectVirtualPath, projectType } = appConfig;
        const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
        exports.remove('', 'client', splitModuleName);
        exports.remove('', 'mock', splitModuleName);
        const folderSuffix = projectType === 'SSR' ? '-ssr' : '';
        if (removeDebug) {
            exports.remove(projectVirtualPath, `debug${folderSuffix}`, item);
            // remove(projectVirtualPath, 'debug', item);
        }
        if (removePublic) {
            exports.remove(projectVirtualPath, `public${folderSuffix}`, item);
        }
    }
    updateArtConfigRemove(moduleEntry);
};
/**
 *
 * @param {String} projectVirtualPath 'demo/spa
 * @param paths
 */
exports.remove = (projectVirtualPath, ...paths) => {
    const commonPath = path_1.join(process.cwd(), ...paths);
    fs_extra_1.removeSync(commonPath);
    printLog_1.printInstructions(`clear ${chalk_1.default.green(commonPath)} folder...`);
    // [ 'client', 'share', 'aa', '22' ]  [ 'debug', 'demo', 'spa', 'share', 'aa', '22' ]
    const pathList = commonPath.split(`${process.cwd()}/`)[1].split('/');
    let count = pathList.length - 2;
    if (projectVirtualPath) {
        count = pathList.length - 2 - projectVirtualPath.split('/').length;
    }
    for (let i = 0; i < count; i++) {
        const pathNext = pathList.slice(0, pathList.length - (i + 1));
        const emptyPath = path_1.join(process.cwd(), pathNext.join('/'));
        const consolePath = emptyPath.split(process.cwd())[1];
        try {
            const dirs = fs_extra_1.readdirSync(emptyPath);
            if (dirs.length < 1) {
                fs_extra_1.removeSync(emptyPath);
                console.log(`clear ${chalk_1.default.green(consolePath)} folder...`);
            }
            else {
                console.log(`${chalk_1.default.green(consolePath)} is not empty`);
                break;
            }
        }
        catch (err) {
            console.log(`read ${chalk_1.default.green(consolePath)} error...`);
        }
    }
};
