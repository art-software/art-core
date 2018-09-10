"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const scaffoldHelper_1 = require("../scaffoldHelper");
module.exports = function (scaffoldFrom, scaffoldTo, callback) {
    console.log('syncConfigFiles');
    const tplFiles = [
        '.babelrc',
        '.eslintrc.json',
        '.artignore',
        'tsconfig.json',
        'tsconfig-mock.json',
        'tslint.json',
        'package.json',
        'README.md'
    ];
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);
    const tplMapping = scaffoldHelper_1.tplHandler(tplFiles, scaffoldFrom, scaffoldTo, scaffoldInstance);
    console.log(`tplMapping: ${JSON.stringify(tplMapping)}`);
    scaffoldHelper_1.execCopyFilesTo(tplMapping);
};
