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
const fs_1 = __importDefault(require("fs"));
const fileHelper_1 = require("art-dev-utils/lib/fileHelper");
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
inquirer_1.confirmModules((answer) => __awaiter(this, void 0, void 0, function* () {
    if (!answer.availableModulesOk) {
        return;
    }
    const moduleList = [];
    const { moduleEntry = [] } = answer;
    for (const module in moduleEntry) {
        moduleList.push(path_1.default.dirname(moduleEntry[module][0]));
    }
    const modulePaths = moduleList.map((value) => {
        return {
            docFolderPath: path_1.default.join(value, '/services/api-docs'),
            modulePath: value
        };
    });
    if (!checkFileExist_1.default(modulePaths.map((value) => value.docFolderPath))) {
        console.log(chalkColors_1.warningText('No api-docs folder in the module, please append first!'));
        return;
    }
    // 这里就拿到了对应要转换的模块，并且保证了其模块下面有对应的api-docs文件夹，那么这里需要执行的就是一个entry到output的事情
    transfromMDfiles(modulePaths);
}));
const transfromMDfiles = (fileEntryPath) => {
    /**
     * 1. 拿到entry
     * 2. 拿到output
     * 3. transfrom
     * 4. write
     */
    const transformFiles = [];
    fileEntryPath.forEach((value) => {
        transformFiles.push({
            docPaths: getWillTransformFiles(value.docFolderPath),
            docManiFestPath: path_1.default.join(value.modulePath, '/services/doc-manifest.json')
        });
    });
    // 去判断是否有manifest做对比
    transformFiles.forEach((value) => {
        fs_1.default.exists(value.docManiFestPath, (status) => {
            console.log(value.docManiFestPath, status);
        });
    });
    // transformFiles.forEach((value) => {
    //   value.forEach((file) => {
    //     console.log(md5(readFileSync(file)));
    //     // const output = getOutputPath(file);
    //     // startMdToInterface(file, output);
    //   });
    // });
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
const contrastMdContent = () => {
};
