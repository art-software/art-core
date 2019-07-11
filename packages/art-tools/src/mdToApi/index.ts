import path from 'path';
import fs from 'fs';
import jclrz from 'json-colorz';
import chalk from 'chalk';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import { confirmChooseModules } from './helper/interfaceGenerator/confirmChooseModules';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import { startMdToInterface } from './md-to-interface';
import { deleteOutputFiles } from './helper/interfaceGenerator/deleteOutput';
import { getWillOperateList } from './helper/interfaceGenerator/getWillOperateList';

confirmChooseModules(async (answer) => {
  if (!answer.availableModulesOk) { return; }
  const moduleList: string[] = [];
  const { moduleEntry = [] } = answer;
  for (const module in moduleEntry) {
    moduleList.push(path.dirname(moduleEntry[module][0]));
  }
  const docFolderList: string[] = moduleList.map((value) => path.join(value, '/services/api-docs'));
  if (!checkFileExist(docFolderList)) {
    console.log(warningText('No api-docs folder in the module, please append first!'));
    return;
  }
  transfromModuleMDFiles(docFolderList);
});

const transfromModuleMDFiles = async (docFolderList: string[]) => {
  const { replaceOutputList, deleteOutputList, moduleDocConfigList } = getWillOperateList(docFolderList);
  const completeTransformFiles: string[] = [];
  // hint replace message
  if (replaceOutputList.length) {
    console.log(chalk.redBright('These files are replaced at compile time!!!'));
    jclrz(JSON.stringify(replaceOutputList, null, 2));
    console.log('\n');
  }
  // delete output
  if (deleteOutputList.length) {
    try {
      await deleteOutputFiles(deleteOutputList);
    } catch (err) { console.log(err); }
  }
  // start transform
  console.log(chalk.blue('Start markdown file compilation, please wait.'));
  moduleDocConfigList.forEach((fileConfig) => {
    const { docConfig, docManiFestPath } = fileConfig;
    docConfig.forEach((config) => {
      try {
        startMdToInterface(config.entry, config.output);
        completeTransformFiles.push(config.entry);
      } catch (err) { console.log(chalk.red(`markdown file parse fail! \n path: ${config.entry} \n error:`), err); }
    });
    fs.writeFileSync(docManiFestPath, JSON.stringify(docConfig, null, 2), 'utf8');
  });
  // success
  jclrz(JSON.stringify(completeTransformFiles, null, 2));
  console.log(chalk.green('You have successfully compiled the above files~~~'));
};