const chalk = require('chalk');

export const cyanText = (text: string) => { return chalk.cyan(text); };

export const cyanBoldText = (text: string) => { return chalk.cyan.bold(text); };

export const greenText = (text: string) => { return chalk.green(text); };

export const grayText = (text: string) => { return chalk.gray(text); };

export const warningText = (text: string) => { return chalk.red.bold(text); };

export const redText = (text: string) => { return chalk.red(text); };