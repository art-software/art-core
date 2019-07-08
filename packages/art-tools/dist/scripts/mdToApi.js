"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("../mdToApi/utils/inquirer");
const checkFileExist_1 = __importDefault(require("art-dev-utils/lib/checkFileExist"));
const path_1 = __importDefault(require("path"));
const fileHelper_1 = require("art-dev-utils/lib/fileHelper");
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
const fs_1 = require("fs");
inquirer_1.confirmModules((answer) => __awaiter(this, void 0, void 0, function* () {
    if (!answer.availableModulesOk) {
        return;
    }
    let moduleList = [];
    const { moduleEntry = [] } = answer;
    for (const module in moduleEntry) {
        moduleList.push(path_1.default.dirname(moduleEntry[module][0]));
    }
    moduleList = moduleList.map((value) => `${value}/services/api-docs`);
    if (!checkFileExist_1.default(moduleList)) {
        console.log(chalkColors_1.warningText('No api-docs folder in the module, please append first!'));
        return;
    }
    // 这里就拿到了对应要转换的模块，并且保证了其模块下面有对应的api-docs文件夹，那么这里需要执行的就是一个entry到output的事情
    transfromMDfiles(moduleList);
}));
const transfromMDfiles = (fileEntry) => {
    /**
     * 1. 拿到entry
     * 2. 拿到output
     * 3. transfrom
     * 4. write
     */
    const transformFiles = [];
    fileEntry.forEach((value) => {
        transformFiles.push(getWillTransformFiles(value));
    });
    transformFiles.forEach((value) => {
        value.forEach((file) => {
            console.log(blueimp_md5_1.default(fs_1.readFileSync(file)));
            // const output = getOutputPath(file);
            // startMdToInterface(file, output);
        });
    });
};
// 只会取其中的md类型文件
const getWillTransformFiles = (folderPath) => {
    const transformFiles = [];
    fileHelper_1.walk(folderPath).forEach((file) => {
        if (path_1.default.extname(file) === '.md') {
            transformFiles.push(path_1.default.resolve(file));
        }
    });
    return transformFiles;
};
const getOutputPath = (entryPath) => {
    entryPath = entryPath.replace('api-docs', 'interfaces');
    entryPath = entryPath.replace('.md', '.ts');
    return entryPath;
};
