"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
exports.printFileCopyLog = (prefix = '/', baseUrl = '', scaffoldTo = '') => {
    console.log(`Copy to [${chalk_1.default.magenta(prefix)}/${chalk_1.default.cyan(path_1.relative(baseUrl, scaffoldTo))}] ok!`);
};
exports.printInstructions = (message) => {
    console.log(chalk_1.default.green(`\n${message}\n`));
};
