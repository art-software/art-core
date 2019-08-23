import jclrz from 'json-colorz';
import inquirer = require('inquirer');

export const inquireParseToMock: (moduleList: string[]) => Promise<{ isCreateMock: boolean }> = (moduleList) => {
    console.log('\n');
    jclrz(JSON.stringify(moduleList, null, 2));
    return inquirer.prompt({
      type: 'confirm',
      name: 'isCreateMock',
      message: 'We find these modules docs are first create. Do you need to create mock?'
    }).then((answer: { isCreateMock: boolean }) => {
      return {
        isCreateMock: answer.isCreateMock
      };
    });
};