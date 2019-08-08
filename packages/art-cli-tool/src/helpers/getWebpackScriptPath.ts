import * as path from 'path';
import { getProjectType } from './projectType';
import { ProjectTypes } from '../enums/ProjectTypes';
import { CompilerNames } from '../enums/CompilerNames';
import { Stage } from '../enums/Stage';

const isDevStage = process.env.STAGE === Stage.dev;

export function getWebpackScriptPath(command: string) {
  const projectType = getProjectType() || ProjectTypes.SPA;
  const compilerName = CompilerNames[projectType];
  const scriptPath = path.resolve(process.cwd(), `./node_modules/${compilerName}/dist/scripts/${command}.js`);
  const symlinkPath = path.resolve(__dirname, `../../../${compilerName}/dist/scripts/${command}.js`);
  return isDevStage ? symlinkPath : scriptPath;
}