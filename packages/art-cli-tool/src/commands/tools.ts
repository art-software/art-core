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

  public describe = chalk.black.bold(`choose any art tools you want to use `);

  public builder(args: Argv) {
    return args;
  }

  public handler = (args: any): void => {
    this.chooseUtils();
  }

  private chooseUtils = async () => {
    const utilChooseAnswer = await inquirer.prompt({
      type: 'list',
      name: 'toolChoice',
      message: 'please chioce one tool to execute',
      choices: [UtilList.MdToApi]
    }) as any;
    const executeUtil = utilChooseAnswer.toolChoice;
    console.log(chalk.green(`Will execute ${executeUtil}`));
    utilsTask(executeUtil);
  }
}

module.exports = new UtilsCommand();