"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FolderName = 'service-web';
let copyInstance;
let scaffoldFrom;
let scaffoldTo;
module.exports = function () {
    copyInstance = this;
    scaffoldFrom = copyInstance.scaffoldFrom;
    scaffoldTo = copyInstance.scaffoldTo;
    return [
        syncConfigFiles.bind(this),
        syncSrcFiles.bind(this),
        syncControllerFiles.bind(this),
        syncServiceFiles.bind(this),
    ];
};
const syncConfigFiles = (callback) => {
    require(`./syncConfigFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
const syncSrcFiles = (callback) => {
    require(`./syncSrcFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
const syncControllerFiles = (callback) => {
    require(`./syncControllerFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
const syncServiceFiles = (callback) => {
    require(`./syncServiceFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
