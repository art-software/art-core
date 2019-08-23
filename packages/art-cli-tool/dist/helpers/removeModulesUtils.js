"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("../config/appConfig"));
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk_1 = __importDefault(require("chalk"));
const updateArtConfigRemove = require('../scaffold/react/updateArtConfigRemove');
/**
 * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
 * @param {Object} moduleEntry  modules to be removed
 * @param {Boolean} removeDebug remove debug path folders or not
 * @param {Boolean} removePublic remove public path folders or not
 */
exports.removeFolders = (moduleEntry, removeDebug, removePublic) => {
    const modulesArr = Object.keys(moduleEntry);
    for (const item of modulesArr) {
        const projectVirtualPath = appConfig_1.default.stores.file.file.projectVirtualPath;
        const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
        this.doRemovePath('client', splitModuleName);
        this.doRemovePath('mock', splitModuleName);
        if (modulesArr.length < 2) {
            this.doRemovePath('client', 'common');
        }
        if (removeDebug) {
            this.doRemovePath('debug', item);
        }
        if (removePublic) {
            this.doRemovePath('public', item);
        }
        updateArtConfigRemove(moduleEntry);
    }
};
exports.doRemovePath = (pathPre, pathNext) => {
    const commonPath = path_1.join(process.cwd(), pathPre, pathNext);
    fs_extra_1.removeSync(commonPath);
    console.log(`clear ${chalk_1.default.green(commonPath)} folder...`);
};
