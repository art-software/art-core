"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const webpackTask_1 = require("../helpers/webpackTask");
class DllCommand {
    constructor() {
        this.command = 'dll';
        this.describe = chalk_1.default.black.bold(`using DllPlugin an venus project with optimized mode `);
    }
    builder(args) {
        return args.example(`$0 dll`, chalk_1.default.black.bold('build optimized with DllPlugin'))
            .updateStrings({
            'Examples:': chalk_1.default.cyan.bold('Examples:')
        });
    }
    handler() {
        webpackTask_1.webpackDll();
    }
}
module.exports = new DllCommand();
