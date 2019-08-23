"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configChooseModules_1 = require("../../../common/config/configChooseModules");
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const json_colorz_1 = __importDefault(require("json-colorz"));
const inquirer_1 = __importDefault(require("inquirer"));
exports.confirmChooseModules = (callback) => {
    const availableModules = configChooseModules_1.getConfigEntries();
    const moduleKeys = Object.keys(availableModules);
    const modulesCount = moduleKeys.length;
    if (!modulesCount) {
        console.log(chalkColors_1.cyanBoldText('No available modules here, please check modules!'));
        return;
    }
    json_colorz_1.default(availableModules);
    inquirer_1.default.prompt({
        type: 'confirm',
        name: 'availableModulesOk',
        message: 'Please confirm above modules you could like?'
    }).then((answer) => {
        const availableModulesOk = answer.availableModulesOk;
        callback({
            availableModulesOk,
            moduleEntry: availableModules
        });
    });
};
