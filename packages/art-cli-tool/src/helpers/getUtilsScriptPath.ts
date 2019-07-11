import * as path from 'path';
import { Stage } from '../enums/Stage';

const isDevStage = process.env.STAGE === Stage.dev;

export function getUtilsScriptPath(utilName: string) {
  utilName = replaceSpaceToHump(utilName);
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-tools/dist/${utilName}`);
  const symlinkPath = path.resolve(process.cwd(), `../art-tools/dist/${utilName}`);
  return isDevStage ? symlinkPath : scriptPath;
}

const replaceSpaceToHump: (str: string) => string  = (str) => {
  const reg = new RegExp(`\\\s(\\w)`, 'g');
  return str.replace(reg, (all, letter) => {
      return letter.toUpperCase();
  });
};