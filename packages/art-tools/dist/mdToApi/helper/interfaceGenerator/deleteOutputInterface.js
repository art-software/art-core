"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const json_colorz_1 = __importDefault(require("json-colorz"));
exports.deleteOutputFiles = (deleteFileList) => {
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
const choiceDeleteFiles = (deleteFileList) => {
    return inquirer_1.default.prompt([
        {
            type: 'checkbox',
            name: 'chooseList',
            choices: deleteFileList,
            message: 'Please choice you want to delete interface files, input i will choose all'
        }
    ]).then((answer) => {
        return {
            chooseList: answer.chooseList
        };
    });
};
