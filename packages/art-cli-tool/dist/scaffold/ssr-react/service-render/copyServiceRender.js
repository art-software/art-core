"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FolderName = 'service-render';
let copyInstance;
let scaffoldFrom;
let scaffoldTo;
module.exports = function () {
    copyInstance = this;
    scaffoldFrom = copyInstance.scaffoldFrom;
    scaffoldTo = copyInstance.scaffoldTo;
    return [
        syncSSRConfigFiles.bind(this),
        syncServiceRenderServerFiles.bind(this)
    ];
};
const syncSSRConfigFiles = (callback) => {
    require(`../syncFolderConfigFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), 'configServiceRenderMapping', FolderName, callback);
};
const syncServiceRenderServerFiles = (callback) => {
    require(`./syncServerFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName, 'src'), path_1.join(scaffoldTo, FolderName, 'src'), FolderName, callback);
};
