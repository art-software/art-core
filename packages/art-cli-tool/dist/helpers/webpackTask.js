"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkFileExist_1 = __importDefault(require("art-dev-utils/lib/checkFileExist"));
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const getWebpackScriptPath_1 = require("./getWebpackScriptPath");
const Env_1 = require("../enums/Env");
const projectType_1 = require("../helpers/projectType");
const ProjectTypes_1 = require("../enums/ProjectTypes");
exports.webpackTask = (command, args) => __awaiter(void 0, void 0, void 0, function* () {
    const finalPath = getWebpackScriptPath_1.getWebpackScriptPath(command);
    if (!checkFileExist_1.default([finalPath])) {
        return;
    }
    const nodeEnv = command === 'serve' ? 'development' : 'production';
    const { modules, port } = args;
    const parsedModules = parseModules_1.default(modules);
    let buildEnv = Env_1.Env.IntegrateTesting;
    if (command === 'build') {
        const envAnswer = yield inquirer_1.default.prompt({
            type: 'list',
            name: 'buildEnv',
            message: 'please chioce one environment to build',
            choices: [Env_1.Env.IntegrateTesting, Env_1.Env.Production]
        });
        buildEnv = envAnswer.buildEnv;
        console.log(`current build environment is: ${chalk_1.default.green(buildEnv)}`);
    }
    executeNodeScript_1.default('node', finalPath, '--NODE_ENV', nodeEnv, '--BUILD_ENV', buildEnv === Env_1.Env.Production ? Env_1.EnvShort.Production : Env_1.EnvShort.IntegrateTesting, '--ART_MODULES', `${JSON.stringify(parsedModules)}`, '--PORT', port || '');
});
exports.webpackDll = () => {
    if (projectType_1.getProjectType() === ProjectTypes_1.ProjectTypes.miniprogram) {
        console.log(`${chalk_1.default.green.bold('art dll')} command is not support in ${chalk_1.default.green.bold(ProjectTypes_1.ProjectTypes.miniprogram)} project`);
        return;
    }
    const dllScript = getWebpackScriptPath_1.getWebpackScriptPath('dll');
    executeNodeScript_1.default('node', dllScript);
};
