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
const chalk_1 = __importDefault(require("chalk"));
const inquirer = require("inquirer");
const ToolList_1 = require("../constants/ToolList");
const toolsTask_1 = require("../helpers/toolsTask");
class ToolsCommand {
    constructor() {
        this.command = 'tools';
        this.describe = chalk_1.default.black.bold(`choose any art tool you would like to use `);
        this.handler = (args) => {
            this.chooseTools();
        };
        this.chooseTools = () => __awaiter(this, void 0, void 0, function* () {
            const toolChooseAnswer = yield inquirer.prompt({
                type: 'list',
                name: 'toolChoice',
                message: 'please choose one tool to execute',
                choices: [ToolList_1.ToolList.MdToApi]
            });
            const executeTool = toolChooseAnswer.toolChoice;
            console.log(chalk_1.default.green(`Will execute ${executeTool}`));
            toolsTask_1.toolsTask(executeTool);
        });
    }
    builder(args) {
        return args;
    }
}
module.exports = new ToolsCommand();
