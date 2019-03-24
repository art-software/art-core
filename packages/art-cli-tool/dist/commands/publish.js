"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moduleTask_1 = require("../helpers/moduleTask");
// TODO add miniprogram support
class PublishCommand {
    constructor() {
        this.command = 'publish';
        this.describe = chalk_1.default.black.bold(`publish compiled art modules `);
    }
    builder(args) {
        return args
            .example(`$0 publish -m="a,b,c"`, chalk_1.default.black.bold('publish compiled given modules'))
            .option('m', {
            alias: 'modules',
            demandOption: true,
            describe: chalk_1.default.black.bold('you should project modules')
        })
            .updateStrings({
            'Examples:': chalk_1.default.cyan.bold('Examples:')
        });
    }
    handler(args) {
        moduleTask_1.moduleTask('publish', { modules: args.modules });
    }
}
module.exports = new PublishCommand();
