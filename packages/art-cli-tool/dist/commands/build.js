"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const webpackTask_1 = require("../helpers/webpackTask");
const projectType_1 = require("../helpers/projectType");
const ProjectTypes_1 = require("../enums/ProjectTypes");
class BuildCommand {
    constructor() {
        this.command = 'build';
        this.describe = chalk_1.default.black.bold(`build an art project with release mode `);
    }
    builder(args) {
        const moduleRequired = projectType_1.getProjectType() !== ProjectTypes_1.ProjectTypes.miniprogram;
        return args
            .example(`$0 build -m="a,b,c"`, chalk_1.default.black.bold('build production version with given modules'))
            .option('m', {
            alias: 'modules',
            demandOption: moduleRequired,
            // default: '',
            describe: chalk_1.default.black.bold('you should project modules')
        })
            .updateStrings({
            'Examples:': chalk_1.default.cyan.bold('Examples:')
        });
    }
    handler(args) {
        webpackTask_1.webpackTask('build', { modules: args.modules });
    }
}
module.exports = new BuildCommand();
