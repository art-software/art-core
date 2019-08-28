import path from 'path';
import fs from 'fs';
import jclrz from 'json-colorz';
import chalk from 'chalk';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import { confirmChooseModules } from './helper/interfaceGenerator/confirmChooseModules';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import { parseMdToInterface } from './md-to-interface';
import { deleteOutputFiles } from './helper/interfaceGenerator/deleteOutputInterface';
import { getWillOperateList } from './helper/interfaceGenerator/getWillOperateList';
import { inquireParseToMock } from './helper/mockGenerator/inquireParseToMock';
import { getParseMockConfig } from './helper/mockGenerator/getParseMockConfig';
import { parseMdToMock } from './md-to-mock';

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
  const { replaceOutputList, deleteOutputList, moduleDocConfigList, firstCreateModuleList } = getWillOperateList(docFolderList);
  const completeToInterfaceFiles: string[] = [];
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
  console.log(chalk.blue('Start markdown file to interface file compilation, please wait...'));
  moduleDocConfigList.forEach((fileConfig) => {
    const { docConfig, docManiFestPath } = fileConfig;
    docConfig.forEach((config) => {
      try {
        parseMdToInterface(config.entry, config.output);
        completeToInterfaceFiles.push(config.entry);
      } catch (err) { console.log(chalk.red(`markdown file parse fail! \n path: ${config.entry} \n error:`), err); }
    });
    if (docConfig.length) {
      fs.writeFileSync(docManiFestPath, JSON.stringify(docConfig, null, 2), 'utf8');
    }
  });
  // success
  jclrz(JSON.stringify(completeToInterfaceFiles, null, 2));
  console.log(chalk.green('You have successfully compiled the above md files to interface file~~~'));
  // inquire create mock
  if (firstCreateModuleList.length) {
    const completeToMockFiles: string[] = [];
    await inquireParseToMock(firstCreateModuleList)
      .then((answer) => {
        if (answer.isCreateMock) {
          console.log(chalk.blue('Start markdown file to mock file compilation, please wait...'));
          const parseMockConfig = getParseMockConfig(firstCreateModuleList);
          parseMockConfig.forEach((moduleConfig, index) => {
            const moduleName = firstCreateModuleList[index].replace('client', '').replace('/services/api-docs', '');
            moduleConfig.forEach((docConfig) => {
              try {
                parseMdToMock(docConfig.entry, docConfig.output, moduleName);
                completeToMockFiles.push(docConfig.entry);
              } catch (err) { console.log(chalk.red(`markdown file parse fail! \n path: ${docConfig.entry} \n error:`), err); }
            });
          });
        }
      });
    // success parse mock
    jclrz(JSON.stringify(completeToMockFiles, null, 2));
    console.log(chalk.green('You have successfully compiled the above md files to mock file~~~'));
  }
};