import * as path from 'path';
import { getProjectType } from './projectType';
import { ProjectTypes } from '../constants/enums/ProjectTypes';
import { CompilerNames } from '../constants/enums/CompilerNames';

const isDevStage = process.env.STAGE === 'dev';
const projectType = getProjectType() || ProjectTypes.SPA;
const compilerName = CompilerNames[projectType];

export function getWebpackScriptPath(command: string) {
  const scriptPath = path.resolve(process.cwd(), `./node_modules/${compilerName}/dist/scripts/${command}.js`);
  const symlinkPath = path.resolve(process.cwd(), `../../node_modules/${compilerName}/dist/scripts/${command}.js`);
  return isDevStage ? symlinkPath : scriptPath;
}