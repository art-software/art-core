"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FolderName = 'web-react';
let copyInstance;
let scaffoldFrom;
let scaffoldTo;
module.exports = function () {
    copyInstance = this;
    scaffoldFrom = copyInstance.scaffoldFrom;
    scaffoldTo = copyInstance.scaffoldTo;
    return [
        syncConfigFiles.bind(this),
        syncArtConfig.bind(this),
        syncServerFiles.bind(this),
        syncClientFiles.bind(this)
    ];
};
const syncConfigFiles = (callback) => {
    require(`./syncConfigFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), callback);
};
const syncArtConfig = (callback) => {
    require(`./syncArtConfig.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), callback);
};
const syncServerFiles = (callback) => {
    require(`./syncServerFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), callback);
};
const syncClientFiles = (callback) => {
    require(`./syncClientFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), callback);
};
