"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("../utils/inquirer");
const httpFileUploader_1 = require("../utils/httpFileUploader");
const fileHelper_1 = require("art-dev-utils/lib/fileHelper");
const path = __importStar(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const async_1 = __importDefault(require("async"));
const inquirer_2 = __importDefault(require("inquirer"));
const DEBUG_PATH = 'debug';
const PUBLISH_PATH = DEBUG_PATH;
inquirer_1.confirmModules((answer) => {
    if (!answer.availableModulesOk) {
        return;
    }
    const modules = answer.moduleEntryKeys;
    let allFiles = [];
    modules.forEach((modulePath) => {
        allFiles = allFiles.concat(fileHelper_1.walk(path.join(process.cwd(), PUBLISH_PATH, modulePath)));
    });
    // Do file filter if necessary
    // allFiles = allFiles.filter((file: string, index: number) => {});
    allFiles.forEach((filePath) => {
        const metaPath = path.relative(path.join(process.cwd(), PUBLISH_PATH), filePath);
        console.log(chalk_1.default.green(`${metaPath}`));
    });
    const uploadSingleFile = (localAbsFilePath, serverRelativePath, callback) => __awaiter(this, void 0, void 0, function* () {
        const metaPath = path.relative(path.join(process.cwd(), PUBLISH_PATH), localAbsFilePath);
        try {
            const uploadResult = yield httpFileUploader_1.httpFileUploader(localAbsFilePath, serverRelativePath);
            if (!uploadResult) {
                return;
            }
            console.log(chalk_1.default.magenta(` ➩ uploading ${chalk_1.default.cyan(metaPath)} has successful'!`));
            callback(null, uploadResult);
        }
        catch (err) {
            console.log(chalk_1.default.magenta(` ➩ uploading ${chalk_1.default.cyan(metaPath)} has failed'!`));
            callback(err, metaPath);
        }
    });
    const asyncQueue = [];
    allFiles.forEach((fileAbsPath) => {
        const metaPath = path.relative(path.join(process.cwd(), PUBLISH_PATH), fileAbsPath);
        let serverRelativePath = path.dirname(metaPath);
        serverRelativePath = 'frontend/' + serverRelativePath;
        asyncQueue.push((callback) => {
            uploadSingleFile(fileAbsPath, serverRelativePath, callback);
        });
    });
    if (!asyncQueue.length) {
        return console.log(chalk_1.default.red.bold(`\nCould not find any file with current publish config !\n`));
    }
    inquirer_2.default.prompt({ type: 'confirm', name: 'confirm', message: 'Please confirm above upload files?' })
        .then((result) => {
        if (result.confirm === true) {
            async_1.default.parallel(asyncQueue, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(chalk_1.default.cyan.bold('\n ====Publish files successfully====\n'));
                }
            });
        }
    });
});
