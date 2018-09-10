"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
module.exports = function (scaffoldFrom, scaffoldTo, callback) {
    console.log('syncArtConfig');
    const configFiles = [
        `${scaffoldFrom}/.babelrc`,
        `${scaffoldFrom}/.eslintignore`,
        `${scaffoldFrom}/.eslintrc.json`,
        // npm publish . can't upload .gitignore to npmjs.org using .venusignore instead
        // `${scaffoldFrom}/.venusignore`,
        `${scaffoldFrom}/jest.config.js`,
        `${scaffoldFrom}/tsconfig.json`,
        `${scaffoldFrom}/tslint.json`,
        `${scaffoldFrom}/package.json`,
        `${scaffoldFrom}/README.md`
    ];
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);
};
