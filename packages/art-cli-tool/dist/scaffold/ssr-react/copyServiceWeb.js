"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const CreateCmdTypes_1 = require("../../enums/CreateCmdTypes");
const FolderName = 'service-web';
let copyInstance;
let scaffoldFrom;
let scaffoldTo;
let moduleName;
module.exports = function (type) {
    console.log('type:::', type);
    copyInstance = this;
    moduleName = copyInstance.moduleName;
    scaffoldFrom = copyInstance.scaffoldFrom;
    scaffoldTo = copyInstance.scaffoldTo;
    if (type === CreateCmdTypes_1.CreateCmdTypes.project) {
        return [
            syncSSRConfigFiles.bind(this),
            syncSSRSrcFiles.bind(this),
            syncSSRControllerFiles.bind(this),
            syncSSRServiceFiles.bind(this),
        ];
    }
    else if (type === CreateCmdTypes_1.CreateCmdTypes.module) {
        scaffoldTo = path_1.resolve(copyInstance.scaffoldTo, '../');
        return [
            syncSSRControllerFiles.bind(this),
            syncSSRServiceFiles.bind(this),
        ];
    }
};
const syncSSRConfigFiles = (callback) => {
    require(`./syncFolderConfigFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), 'configServiceWebMapping', FolderName, callback);
};
const syncSSRSrcFiles = (callback) => {
    require(`./syncServiceWebSrcFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
const syncSSRControllerFiles = (callback) => {
    require(`./syncServiceWebControllerFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
const syncSSRServiceFiles = (callback) => {
    require(`./syncServiceWebServiceFiles.js`).call(copyInstance, path_1.join(scaffoldFrom, FolderName), path_1.join(scaffoldTo, FolderName), FolderName, callback);
};
