"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = __importDefault(require("../config/paths"));
const wxappDefaultProjectConfig_json_1 = __importDefault(require("../config/wxappDefaultProjectConfig.json"));
const lodash_1 = require("lodash");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const json_format_1 = __importDefault(require("json-format"));
const FileNames_1 = require("../constants/FileNames");
const packageJSON = require(paths_1.default.appPackageJson);
exports.compileProjectConfig = (options) => {
    const { name, appid } = packageJSON;
    const projectConfig = lodash_1.extend({}, wxappDefaultProjectConfig_json_1.default, {
        appid,
        projectname: options.build ? name + '-build' : name
    });
    return new Promise((resolve) => {
        if (fs_1.existsSync(options.projectConfigPath)) {
            console.log(`${chalk_1.default.blue('=>')} ${FileNames_1.PROJECTCONFIG} ${chalk_1.default.green('has existed')}`);
            resolve();
        }
        else {
            fs_1.writeFileSync(options.projectConfigPath, json_format_1.default(projectConfig, {
                type: 'space',
                size: 2
            }), { encoding: 'utf8' });
            console.log(`${chalk_1.default.blue('=>')} File ${chalk_1.default.cyan(`${FileNames_1.PROJECTCONFIG}`)} has created`);
            resolve();
        }
    });
};
