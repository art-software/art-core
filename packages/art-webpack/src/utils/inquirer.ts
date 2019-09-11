import { webpackEntries } from '../config/configWebpackModules';
import { cyanBoldText } from 'art-dev-utils/lib/chalkColors';
import jclrz from 'json-colorz';
import inquirer from 'inquirer';
import appConfig from '../config/appConfig';

interface CbParamsProps {
  availableModulesOk: boolean;
  moduleEntryKeys: string[];
}

export const confirmModules = (callback: (answer: CbParamsProps) => any): void => {
  //  const availableModules = webpackEntries(false);
  let argvModules: string[] = JSON.parse(appConfig.get('ART_MODULES') || '[]');
  if (typeof argvModules === 'string') {
    argvModules = JSON.parse(argvModules);
  }
  const availableModules = {};
  argvModules.forEach((moduleEntry) => {
    Object.assign(availableModules, webpackEntries(moduleEntry, false));
  });

  const moduleKeys = Object.keys(availableModules);
  const modulesCount = moduleKeys.length;

  if (!modulesCount) {
    console.log(cyanBoldText('No available modules here, please check `--modules`!'));
    return;
  }

  for (let i = 0; i < modulesCount; i++) {
    availableModules[moduleKeys[i]][0] = 'polyfills';
  }

  jclrz(availableModules);

  inquirer.prompt({
    type: 'confirm',
    name: 'availableModulesOk',
    message: 'Please confirm above modules you could like?'
  }).then((answer: any) => {
    const availableModulesOk = answer.availableModulesOk;

    callback({
      availableModulesOk,
      moduleEntryKeys: Object.keys(availableModules)
    });
  });
};