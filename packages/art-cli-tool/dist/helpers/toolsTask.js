"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ToolList_1 = require("../constants/ToolList");
const inquirer = require("inquirer");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const getUtilsScriptPath_1 = require("./getUtilsScriptPath");
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
const chalk_1 = __importDefault(require("chalk"));
exports.toolsTask = (utilName) => {
    switch (utilName) {
        case ToolList_1.ToolList.MdToApi:
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
        message: `Which module would you like to modify？\nexample: ${chalk_1.default.blue('home mine')} \ninput module name :`
    };
    return inquirer.prompt(modulesAnswer).then((answer) => answer);
};
