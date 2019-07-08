"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilList_1 = require("../constants/UtilList");
const inquirer = require("inquirer");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const getUtilsScriptPath_1 = require("./getUtilsScriptPath");
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
exports.utilsTask = (utilName) => {
    switch (utilName) {
        case UtilList_1.UtilList.MdToApi:
            inputWillChangeModules()
                .then((answer) => {
                const filePath = getUtilsScriptPath_1.getUtilsScriptPath(utilName);
                const parsedModules = parseModules_1.default(answer.modulesList);
                executeNodeScript_1.default('node', filePath, '--ART_MODULES', `${JSON.stringify(parsedModules)}`);
            });
            break;
    }
};
const inputWillChangeModules = () => {
    const modulesAnswer = {
        type: 'input',
        name: 'modulesList',
        message: `Which modules do you want to modify？
example: home mine
input module name :`
    };
    return inquirer.prompt(modulesAnswer).then((answer) => answer);
};
