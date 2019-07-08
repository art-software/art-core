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
const chalk_1 = __importDefault(require("chalk"));
const projectType_1 = require("../helpers/projectType");
const ProjectTypes_1 = require("../enums/ProjectTypes");
const inquirer = require("inquirer");
const UtilList_1 = require("../constants/UtilList");
const utilsTask_1 = require("../helpers/utilsTask");
// TODO add miniprogram support
class UtilsCommand {
    constructor() {
        this.command = 'tools';
        this.describe = chalk_1.default.black.bold(`choose any art utils you want to use `);
        this.handler = (args) => {
            // webpackTask('build', { modules: args.modules });
            this.chooseUtils();
        };
        this.chooseUtils = () => __awaiter(this, void 0, void 0, function* () {
            const utilChooseAnswer = yield inquirer.prompt({
                type: 'list',
                name: 'utilChioce',
                message: 'please chioce one util to execute',
                choices: [UtilList_1.UtilList.MdToApi, UtilList_1.UtilList.Test]
            });
            const executeUtil = utilChooseAnswer.utilChioce;
            console.log(`Will execute ${executeUtil}`);
            utilsTask_1.utilsTask(executeUtil);
        });
    }
    builder(args) {
        const moduleRequired = projectType_1.getProjectType() !== ProjectTypes_1.ProjectTypes.miniprogram;
        return args;
    }
}
module.exports = new UtilsCommand();
