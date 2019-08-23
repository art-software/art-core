import path from 'path';
import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { getProjectType } from '../helpers/projectType';
import { ProjectTypes } from '../enums/ProjectTypes';
import parseModules from 'art-dev-utils/lib/parseModules';
import { confirmChooseModules } from '../helpers/confirmChooseModules';
import { removeFolders } from '../helpers/removeModulesUtils';
import inquirer = require('inquirer');

class RemoveCommand implements CommandModule {

  public readonly command = 'remove';

  public readonly desc = chalk.black.bold('remove one or more modules' );

  public builder (args: Argv) {
    const moduleRequired = getProjectType() !== ProjectTypes.miniprogram;
    return args
      .example(`$0 remove -m="a,b,c"`, chalk.black.bold('remove given modules'))
      .option('m', {
        alias: 'modules',
        demandOption: moduleRequired,
        describe: chalk.black.bold('modules you have created')
      })
      .updateStrings({
        'Examples:': chalk.cyan.bold('Examples:')
      });
  }

  public handler (args: any): void {
    const { modules } = args;
    const parsedModules = parseModules(modules);
    confirmChooseModules(parsedModules, async (answer) => {
      if (!answer.availableModulesOk) { return; }
      inquirer.prompt([{
        type: 'confirm',
        name: 'removeDebugOk',
        message: 'delete debug folders for you?'
      }, {
        type: 'confirm',
        name: 'removePublicOk',
        message: 'delete public folders for you?'
      }]).then((answers: { removePublicOk: boolean, removeDebugOk: boolean }) => {
        removeFolders(answer.moduleEntry, answers.removeDebugOk, answers.removePublicOk);
      });
    });
  }
}

module.exports = new RemoveCommand();