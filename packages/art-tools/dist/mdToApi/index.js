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
const chalk_1 = __importDefault(require("chalk"));
const checkFileExist_1 = __importDefault(require("art-dev-utils/lib/checkFileExist"));
const confirmChooseModules_1 = require("./helper/interfaceGenerator/confirmChooseModules");
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const md_to_interface_1 = require("./md-to-interface");
const deleteOutputInterface_1 = require("./helper/interfaceGenerator/deleteOutputInterface");
const getWillOperateList_1 = require("./helper/interfaceGenerator/getWillOperateList");
const inquireParseToMock_1 = require("./helper/mockGenerator/inquireParseToMock");
const getParseMockConfig_1 = require("./helper/mockGenerator/getParseMockConfig");
const md_to_mock_1 = require("./md-to-mock");
confirmChooseModules_1.confirmChooseModules((answer) => __awaiter(this, void 0, void 0, function* () {
    if (!answer.availableModulesOk) {
        return;
    }
    const moduleList = [];
    const { moduleEntry = [] } = answer;
    for (const module in moduleEntry) {
        moduleList.push(path_1.default.dirname(moduleEntry[module][0]));
    }
    const docFolderList = moduleList.map((value) => path_1.default.join(value, '/services/api-docs'));
    if (!checkFileExist_1.default(docFolderList)) {
        console.log(chalkColors_1.warningText('No api-docs folder in the module, please append first!'));
        return;
    }
    transfromModuleMDFiles(docFolderList);
}));
const transfromModuleMDFiles = (docFolderList) => __awaiter(this, void 0, void 0, function* () {
    const { replaceOutputList, deleteOutputList, moduleDocConfigList, firstCreateModuleList } = getWillOperateList_1.getWillOperateList(docFolderList);
    const completeToInterfaceFiles = [];
    // hint replace message
    if (replaceOutputList.length) {
        console.log(chalk_1.default.redBright('These files are replaced at compile time!!!'));
        json_colorz_1.default(JSON.stringify(replaceOutputList, null, 2));
        console.log('\n');
    }
    // delete output
    if (deleteOutputList.length) {
        try {
            yield deleteOutputInterface_1.deleteOutputFiles(deleteOutputList);
        }
        catch (err) {
            console.log(err);
        }
    }
    // start transform
    console.log(chalk_1.default.blue('Start markdown file to interface file compilation, please wait...'));
    moduleDocConfigList.forEach((fileConfig) => {
        const { docConfig, docManiFestPath } = fileConfig;
        docConfig.forEach((config) => {
            try {
                md_to_interface_1.parseMdToInterface(config.entry, config.output);
                completeToInterfaceFiles.push(config.entry);
            }
            catch (err) {
                console.log(chalk_1.default.red(`markdown file parse fail! \n path: ${config.entry} \n error:`), err);
            }
        });
        if (docConfig.length) {
            fs_1.default.writeFileSync(docManiFestPath, JSON.stringify(docConfig, null, 2), 'utf8');
        }
    });
    // success
    json_colorz_1.default(JSON.stringify(completeToInterfaceFiles, null, 2));
    console.log(chalk_1.default.green('You have successfully compiled the above md files to interface file~~~'));
    // inquire create mock
    if (firstCreateModuleList.length) {
        const completeToMockFiles = [];
        yield inquireParseToMock_1.inquireParseToMock(firstCreateModuleList)
            .then((answer) => {
            if (answer.isCreateMock) {
                console.log(chalk_1.default.blue('Start markdown file to mock file compilation, please wait...'));
                const parseMockConfig = getParseMockConfig_1.getParseMockConfig(firstCreateModuleList);
                parseMockConfig.forEach((moduleConfig, index) => {
                    const moduleName = firstCreateModuleList[index].replace('client', '').replace('/services/api-docs', '');
                    moduleConfig.forEach((docConfig) => {
                        try {
                            md_to_mock_1.parseMdToMock(docConfig.entry, docConfig.output, moduleName);
                            completeToMockFiles.push(docConfig.entry);
                        }
                        catch (err) {
                            console.log(chalk_1.default.red(`markdown file parse fail! \n path: ${docConfig.entry} \n error:`), err);
                        }
                    });
                });
            }
        });
        // success parse mock
        json_colorz_1.default(JSON.stringify(completeToMockFiles, null, 2));
        console.log(chalk_1.default.green('You have successfully compiled the above md files to mock file~~~'));
    }
});
