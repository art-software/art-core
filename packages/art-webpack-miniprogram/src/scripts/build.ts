import { MiniProgramCompiler } from '../compiler/index';
import paths from '../config/paths';
import chalk from 'chalk';
const packageJSON = require(paths.appPackageJson);
const { name } = packageJSON;

console.log(`Start building miniprogram: ${chalk.bold(name)}`);

const miniProgramCompiler = new MiniProgramCompiler();

try {
  miniProgramCompiler.buildAll();
} catch (e) {
  console.log(`${chalk.red('Miniprogram Build Error:')}`);
  console.log(e);
}