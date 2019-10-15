"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../../printLog");
const scaffoldHelper_1 = require("../../scaffoldHelper");
const fileSyncMapping_1 = require("./fileSyncMapping");
module.exports = function (scaffoldFrom, scaffoldTo, folder, callback) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} controller] files...`);
    const tplMapping = scaffoldHelper_1.tplMappingAssembler([
        ...fileSyncMapping_1.controllerMapping(scaffoldInstance)
    ], scaffoldFrom, scaffoldTo);
    return scaffoldHelper_1.execCopyFilesTo(tplMapping)
        .then((result) => {
        printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} controller] files ok`);
        callback(null, result);
    })
        .catch(callback);
};
