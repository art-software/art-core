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
const projectType_1 = require("../helpers/projectType");
const ProjectTypes_1 = require("../enums/ProjectTypes");
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
const confirmChooseModules_1 = require("../helpers/confirmChooseModules");
const removeModules_1 = require("../helpers/removeModules");
const inquirer = require("inquirer");
class RemoveCommand {
    constructor() {
        this.command = 'remove';
        this.desc = chalk_1.default.black.bold('remove one or more modules');
    }
    builder(args) {
        const moduleRequired = projectType_1.getProjectType() !== ProjectTypes_1.ProjectTypes.miniprogram;
        return args
            .example(`$0 remove -m="a,b,c"`, chalk_1.default.black.bold('remove given modules'))
            .option('m', {
            alias: 'modules',
            demandOption: moduleRequired,
            describe: chalk_1.default.black.bold('modules you have created and would like to removed')
        })
            .updateStrings({
            'Examples:': chalk_1.default.cyan.bold('Examples:')
        });
    }
    handler(args) {
        const { modules } = args;
        const parsedModules = parseModules_1.default(modules);
        confirmChooseModules_1.confirmChooseModules(parsedModules, (answer) => __awaiter(this, void 0, void 0, function* () {
            if (!answer.availableModulesOk) {
                return;
            }
            inquirer.prompt([{
                    type: 'confirm',
                    name: 'removeDebug',
                    default: false,
                    message: 'delete debug folder?'
                }, {
                    type: 'confirm',
                    name: 'removePublic',
                    default: false,
                    message: 'delete public folder?'
                }]).then((answers) => {
                removeModules_1.removeFolders(answer.moduleEntry, answers.removeDebug, answers.removePublic);
            });
        }));
    }
}
module.exports = new RemoveCommand();
