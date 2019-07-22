import inquirer from 'inquirer';
import fs from 'fs';
import jclrz from 'json-colorz';

export const deleteOutputFiles = (deleteFileList: string[]) => {
  const removeFiles: string[] = [];
  return choiceDeleteFiles(deleteFileList)
    .then((answer) => {
      answer.chooseList.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
          removeFiles.push(file);
        }
      });
      console.log('These files have been deleted!');
      jclrz(removeFiles);
    });
};

const choiceDeleteFiles: (deleteFileList: string[]) => Promise<{ chooseList: string[] }> = (deleteFileList) => {
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'chooseList',
      choices: deleteFileList,
      message: 'Please choice you want to delete interface files, input i will choose all'
    }
  ]).then((answer: { chooseList: string[] }) => {
    return {
      chooseList: answer.chooseList
    };
  });
};
