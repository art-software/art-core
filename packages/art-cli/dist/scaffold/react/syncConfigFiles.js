"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const scaffoldHelper_1 = require("../scaffoldHelper");
module.exports = function (scaffoldFrom, scaffoldTo, callback) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);
    const tplMapping = scaffoldHelper_1.tplMappingAssembler(scaffoldFrom, scaffoldTo, scaffoldInstance);
    console.log(`tplMapping: ${JSON.stringify(tplMapping)}`);
    scaffoldHelper_1.execCopyFilesTo(tplMapping);
};
