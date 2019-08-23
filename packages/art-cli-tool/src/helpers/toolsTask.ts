import { ToolList } from '../constants/ToolList';
import { Answers } from 'inquirer';
import inquirer = require('inquirer');
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import { getUtilsScriptPath } from './getUtilsScriptPath';
import parseModules from 'art-dev-utils/lib/parseModules';
import chalk from 'chalk';

export const toolsTask = (utilName: ToolList) => {
  switch (utilName) {
    case ToolList.MdToApi:
      inputWillChangeModules()
        .then((answer) => {
          const filePath = getUtilsScriptPath(utilName);
          const parsedModules = parseModules(answer.modulesList);
          executeNodeScript('node', filePath, '--ART_MODULES', `${JSON.stringify(parsedModules)}`);
        });
      break;
  }
};

const inputWillChangeModules = () => {
  const modulesAnswer = {
    type: 'input',
    name: 'modulesList',
    message: `Which module would you like to modify？\nexample: ${chalk.blue('home mine')} \ninput module name :`
  };
  return inquirer.prompt(modulesAnswer).then((answer: Answers) => answer);
};