import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import inquirer = require('inquirer');
import { ToolList } from '../constants/ToolList';
import { toolsTask } from '../helpers/toolsTask';

class ToolsCommand implements CommandModule {

  public readonly command = 'tools';

  public describe = chalk.black.bold(`choose any art tool you would like to use `);

  public builder(args: Argv) {
    return args;
  }

  public handler = (args: any): void => {
    this.chooseTools();
  }

  private chooseTools = async () => {
    const toolChooseAnswer = await inquirer.prompt({
      type: 'list',
      name: 'toolChoice',
      message: 'please choose one tool to execute',
      choices: [ToolList.MdToApi]
    }) as any;
    const executeTool = toolChooseAnswer.toolChoice;
    console.log(chalk.green(`Will execute ${executeTool}`));
    toolsTask(executeTool);
  }
}

module.exports = new ToolsCommand();