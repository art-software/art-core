import { webpackEntries } from '../config/configWebpackModules';
import { cyanBoldText } from '../../../art-dev-utils/lib/chalkColors';
import jclrz from 'json-colorz';
import inquirer from 'inquirer';

interface CbParamsProps {
  availableModulesOk: boolean;
  moduleEntryKeys: string[];
}

export const confirmModules = (callback: (answer: CbParamsProps) => any): void => {
 const availableModules = webpackEntries(false);

 if (!Object.keys(availableModules).length) {
   console.log(cyanBoldText('No available modules here, please check `--modules`!'));
   return;
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