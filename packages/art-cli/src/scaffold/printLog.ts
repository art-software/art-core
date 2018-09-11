import chalk from 'chalk';
import { relative } from 'path';

export const printFileCopyLog = (prefix: string = '/', baseUrl: string = '', scaffoldTo: string = '') => {
  console.log(`Copy to [${chalk.magenta(prefix)}/${chalk.cyan(relative(baseUrl, scaffoldTo))}] ok!`);
};

export const printInstructions = (message: string) => {
  console.log(chalk.green(`\n${message}\n`));
};