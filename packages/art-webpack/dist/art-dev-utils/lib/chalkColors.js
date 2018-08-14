"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
exports.cyanText = (text) => { return chalk.cyan(text); };
exports.cyanBoldText = (text) => { return chalk.cyan.bold(text); };
exports.greenText = (text) => { return chalk.green(text); };
exports.grayText = (text) => { return chalk.gray(text); };
exports.warningText = (text) => { return chalk.red.bold(text); };
exports.redText = (text) => { return chalk.red(text); };
