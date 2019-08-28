"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const fs_extra_1 = __importDefault(require("fs-extra"));
module.exports = function (scaffoldTo, callback) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [app JSON] files...`);
    console.log('scaffoldTo', scaffoldTo);
    fs_extra_1.default.readFile(`${scaffoldTo}/client/app.json`, 'utf8', (err, data) => {
        if (err) {
            console.log('app.json update failed with following err, please maually modify it', err);
        }
        else {
            try {
                const appConfig = JSON.parse(data);
                const moduleName = this.moduleName.indexOf('/') === 0 ? this.moduleName.substr(1) : this.moduleName;
                appConfig.pages.push(`${moduleName}/pages/index`);
                fs_extra_1.default.writeFileSync(`${scaffoldTo}/client/app.json`, JSON.stringify(appConfig, null, 2), 'utf8');
                printLog_1.printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [app JSON] files ok`);
            }
            catch (err) {
                console.log('err', err);
            }
        }
        callback();
    });
};
