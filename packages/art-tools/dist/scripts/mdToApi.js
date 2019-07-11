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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const json_colorz_1 = __importDefault(require("json-colorz"));
const inquirer = require("inquirer");
const chalk_1 = __importDefault(require("chalk"));
const checkFileExist_1 = __importDefault(require("art-dev-utils/lib/checkFileExist"));
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
const inquirer_1 = require("../mdToApi/utils/inquirer");
const fileHelper_1 = require("art-dev-utils/lib/fileHelper");
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const mdToApi_1 = require("../mdToApi");
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
    transfromModuleMDfiles(modulePaths);
}));
// fileEntryPath => api-doc list
const transfromModuleMDfiles = (fileEntryPath) => __awaiter(this, void 0, void 0, function* () {
    const deleteOutputList = [];
    const replaceOutputList = [];
    const transformFiles = [];
    const finalTransformFiles = [];
    fileEntryPath.forEach((value) => {
        // moduleApiDocs => module md path list
        const moduleApiDocConfig = getModuleApiDocConfig(value.docFolderPath);
        transformFiles.push(moduleApiDocConfig);
        const { docConfig, docManiFestPath } = moduleApiDocConfig;
        const maniFestInfo = getDocManifestInfo(docManiFestPath);
        // has record will check
        if (maniFestInfo.length) {
            // delete collect
            maniFestInfo.forEach((docInfo) => {
                if (!(docConfig.map((doc) => doc.entry).includes(docInfo.entry)) && fs_1.default.existsSync(docInfo.output)) {
                    deleteOutputList.push(docInfo.output);
                }
            });
            // diff contrast use md5
            docConfig.forEach((config) => {
                maniFestInfo.forEach((docInfo) => {
                    if (docInfo.entry === config.entry &&
                        docInfo.output === config.output &&
                        docInfo.md5 !== blueimp_md5_1.default(fs_1.default.readFileSync(config.entry, 'utf8'))) {
                        replaceOutputList.push(config.output);
                    }
                });
            });
        }
    });
    if (replaceOutputList.length) {
        console.log(chalk_1.default.redBright('These files are replaced at compile time!!!'));
        json_colorz_1.default(replaceOutputList);
        console.log('\n');
    }
    if (deleteOutputList.length) {
        try {
            yield deleteOutputFiles(deleteOutputList);
        }
        catch (err) {
            console.log(err);
        }
    }
    console.log(chalk_1.default.blue('Start markdown file compilation, please wait.'));
    transformFiles.forEach((fileConfig) => {
        const { docConfig, docManiFestPath } = fileConfig;
        docConfig.forEach((config) => {
            try {
                mdToApi_1.startMdToInterface(config.entry, config.output);
                finalTransformFiles.push(config.entry);
            }
            catch (err) {
                console.log(chalk_1.default.red(`markdown file parse fail! \n path: ${config.entry} \n error:`), err);
            }
        });
        fs_1.default.writeFileSync(docManiFestPath, JSON.stringify(docConfig, null, 2), 'utf8');
    });
    json_colorz_1.default(JSON.stringify(finalTransformFiles, null, 2));
    console.log(chalk_1.default.green('You have successfully compiled the above files~~~'));
});
const getModuleApiDocConfig = (folderPath) => {
    const docConfig = [];
    fileHelper_1.walk(folderPath).forEach((file) => {
        if (path_1.default.extname(file) === '.md') {
            const entry = path_1.default.relative(process.cwd(), file);
            const fileConfig = {
                entry,
                output: getOutputPath(entry),
                md5: blueimp_md5_1.default(fs_1.default.readFileSync(entry, 'utf8'))
            };
            docConfig.push(fileConfig);
        }
    });
    const moduleDocConfig = {
        docConfig,
        docManiFestPath: path_1.default.join(folderPath, '/doc-manifest.json')
    };
    return moduleDocConfig;
};
const getDocManifestInfo = (filePath) => {
    let docManifestInfo = [];
    if (fs_1.default.existsSync(filePath)) {
        docManifestInfo = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8') || '[]');
    }
    return docManifestInfo;
};
// 只会取其中的md类型文件
const getEntryMDFiles = (folderPath) => {
    const transformFiles = [];
    fileHelper_1.walk(folderPath).forEach((file) => {
        if (path_1.default.extname(file) === '.md') {
            transformFiles.push(path_1.default.relative(process.cwd(), file));
        }
    });
    return transformFiles;
};
const getOutputPath = (entryPath) => {
    entryPath = entryPath.replace('api-docs', 'interfaces');
    entryPath = entryPath.replace('.md', '.ts');
    return entryPath;
};
const confirmReplaceFiles = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'replaceOutput',
            default: true,
            message: 'Please confirm whether to replace these files?'
        }
    ]).then((answer) => {
        return {
            replaceOutput: answer.replaceOutput
        };
    });
};
const choiceDeleteFiles = (deleteFileList) => {
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'chooseList',
            choices: deleteFileList,
            message: 'Please choice you want to delete interface files, choose all will delete all'
        }
    ]).then((answer) => {
        return {
            chooseList: answer.chooseList
        };
    });
};
const deleteOutputFiles = (deleteFileList) => {
    const removeFiles = [];
    return choiceDeleteFiles(deleteFileList)
        .then((answer) => {
        answer.chooseList.forEach((file) => {
            if (fs_1.default.existsSync(file)) {
                fs_1.default.unlinkSync(file);
                removeFiles.push(file);
            }
        });
        console.log('These files have been deleted!');
        json_colorz_1.default(removeFiles);
    });
};
