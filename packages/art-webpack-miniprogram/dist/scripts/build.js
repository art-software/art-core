"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../compiler/index");
const paths_1 = __importDefault(require("../config/paths"));
const chalk_1 = __importDefault(require("chalk"));
const packageJSON = require(paths_1.default.appPackageJson);
const { name } = packageJSON;
console.log(`Start building miniprogram: ${chalk_1.default.bold(name)}`);
const miniProgramCompiler = new index_1.MiniProgramCompiler();
try {
    miniProgramCompiler.buildAll();
}
catch (e) {
    console.log(`${chalk_1.default.red('Miniprogram Build Error:')}`);
    console.log(e);
}
