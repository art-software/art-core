"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FolderName = 'service-web';
let copyInstance;
let scaffoldFrom;
let scaffoldTo;
let moduleName;
module.exports = function () {
    copyInstance = this;
    scaffoldFrom = copyInstance.scaffoldFrom;
    scaffoldTo = copyInstance.scaffoldTo;
    moduleName = copyInstance.moduleName;
    return [
        syncSSRConfigFiles.bind(this),
        syncSSRSrcFiles.bind(this)
    ];
};
const syncSSRConfigFiles = (callback) => {
    require(`./syncFolderConfigFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), 'configServiceWebMapping', FolderName, callback);
};
const syncSSRSrcFiles = (callback) => {
    require(`./syncServiceWebSrcFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
