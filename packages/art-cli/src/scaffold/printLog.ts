import chalk from 'chalk';
import { relative } from 'path';

export const printFileCopyLog = (prefix: string = '/', scaffoldTo: string = '', newPath: string = '') => {
  console.log(`Copy to [${chalk.magenta(prefix)}/${chalk.cyan(relative(scaffoldTo, newPath))}] ok!`);
};

export const printInstructions = (message: string) => {
  console.log(chalk.green(`\n${message}\n`));
};