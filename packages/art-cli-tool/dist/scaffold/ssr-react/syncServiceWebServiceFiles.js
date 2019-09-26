"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const scaffoldHelper_1 = require("../scaffoldHelper");
const fileSyncMapping_1 = require("./fileSyncMapping");
module.exports = function (scaffoldFrom, scaffoldTo, folder, callback) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} services] files...`);
    const tplMapping = scaffoldHelper_1.tplMappingAssembler([
        ...fileSyncMapping_1.servicesServiceWebMapping(scaffoldInstance)
    ], scaffoldFrom, scaffoldTo);
    return scaffoldHelper_1.execCopyFilesTo(tplMapping)
        .then((result) => {
        printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} services] files ok`);
        callback(null, result);
    })
        .catch(callback);
};
