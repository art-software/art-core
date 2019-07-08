import * as path from 'path';
// import { getProjectType } from './projectType';
// import { ProjectTypes } from '../enums/ProjectTypes';
// import { CompilerNames } from '../enums/CompilerNames';
import { Stage } from '../enums/Stage';

const isDevStage = process.env.STAGE === Stage.dev;

export function getUtilsScriptPath(utilName: string) {
  utilName = replaceSpaceToHump(utilName);
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-tools/dist/scripts/${utilName}.js`);
  const symlinkPath = path.resolve(process.cwd(), `../art-tools/dist/scripts/${utilName}.js`);
  return isDevStage ? symlinkPath : scriptPath;
}

const replaceSpaceToHump: (str: string) => string  = (str) => {
  const reg = new RegExp(`\\\s(\\w)`, 'g');
  return str.replace(reg, (all, letter) => {
      return letter.toUpperCase();
  });
};