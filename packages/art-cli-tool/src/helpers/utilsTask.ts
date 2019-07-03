import { UtilList } from '../constants/UtilList';
import { Answers } from 'inquirer';
import inquirer = require('inquirer');

export const utilsTask = (utilName: UtilList) => {
  switch (utilName) {
    case UtilList.MdToApi:
      inputWillChangeModules()
      .then((answer) => {
        console.log('answer', answer);
      });
      break;
  }
};

const inputWillChangeModules = () => {
  const modulesAnswer = {
    type: 'input',
    name: 'modulesList',
    message: 'please input any modules to change',
  };
  return inquirer.prompt(modulesAnswer).then((answer: Answers) => answer);
};