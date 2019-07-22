import { getConfigEntries } from '../../../common/config/configChooseModules';
import { cyanBoldText } from 'art-dev-utils/lib/chalkColors';
import jclrz from 'json-colorz';
import inquirer from 'inquirer';

interface CbParamsProps {
  availableModulesOk: boolean;
  moduleEntry: object;
}

export const confirmChooseModules = (callback: (answer: CbParamsProps) => any): void => {
 const availableModules = getConfigEntries();
 const moduleKeys = Object.keys(availableModules);
 const modulesCount = moduleKeys.length;
 if (!modulesCount) {
   console.log(cyanBoldText('No available modules here, please check modules!'));
   return;
 }

 jclrz(availableModules);

 inquirer.prompt({
   type: 'confirm',
   name: 'availableModulesOk',
   message: 'Please confirm above modules you could like?'
 }).then((answer: { availableModulesOk: boolean }) => {
  const availableModulesOk = answer.availableModulesOk;

  callback({
    availableModulesOk,
    moduleEntry: availableModules
  });
 });
};