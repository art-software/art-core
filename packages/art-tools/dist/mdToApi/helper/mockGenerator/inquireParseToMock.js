"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_colorz_1 = __importDefault(require("json-colorz"));
const inquirer = require("inquirer");
exports.inquireParseToMock = (moduleList) => {
    console.log('\n');
    json_colorz_1.default(JSON.stringify(moduleList, null, 2));
    return inquirer.prompt({
        type: 'confirm',
        name: 'isCreateMock',
        message: 'We find these modules docs are first create. Do you need to create mock?'
    }).then((answer) => {
        return {
            isCreateMock: answer.isCreateMock
        };
    });
};
