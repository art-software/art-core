"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkFileExist_1 = __importDefault(require("art-dev-utils/lib/checkFileExist"));
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
const chalk_1 = __importDefault(require("chalk"));
const getWebpackScriptPath_1 = require("./getWebpackScriptPath");
exports.moduleTask = (command, args) => {
    const finalPath = getWebpackScriptPath_1.getWebpackScriptPath(command);
    if (!checkFileExist_1.default([finalPath])) {
        if (command === 'publish') {
            chalk_1.default.black.bold('please make sure art-webpack version is higher than or equal to v0.0.12');
        }
        return;
    }
    const { modules } = args;
    const parsedModules = parseModules_1.default(modules);
    executeNodeScript_1.default('node', finalPath, '--BUILD_ENV', 'inte', '--ART_MODULES', `${JSON.stringify(parsedModules)}`);
};
