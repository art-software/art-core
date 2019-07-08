import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { getProjectType } from '../helpers/projectType';
import { ProjectTypes } from '../enums/ProjectTypes';
import inquirer = require('inquirer');
import { UtilList } from '../constants/UtilList';
import { utilsTask } from '../helpers/utilsTask';

// TODO add miniprogram support
class UtilsCommand implements CommandModule {

  public readonly command = 'tools';

  public describe = chalk.black.bold(`choose any art utils you want to use `);

  public builder(args: Argv) {
    const moduleRequired = getProjectType() !== ProjectTypes.miniprogram;
    return args;
  }

  public handler = (args: any): void => {
    // webpackTask('build', { modules: args.modules });
    this.chooseUtils();
  }

  private chooseUtils = async () => {
    const utilChooseAnswer = await inquirer.prompt({
      type: 'list',
      name: 'utilChioce',
      message: 'please chioce one util to execute',
      choices: [UtilList.MdToApi, UtilList.Test]
    }) as any;
    const executeUtil = utilChooseAnswer.utilChioce;
    console.log(`Will execute ${executeUtil}`);
    utilsTask(executeUtil);
  }
}

module.exports = new UtilsCommand();