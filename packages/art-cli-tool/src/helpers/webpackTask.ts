import * as path from 'path';
import * as fs from 'fs';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';
import inquirer from 'inquirer';
import chalk from 'chalk';

const artConfigPath = path.join(`${process.cwd()}`, 'art.config.js');
let projectType;
if (fs.existsSync(artConfigPath)) {
  projectType = require(artConfigPath).projectType;
}

interface Args {
  modules: string;
}

const isDevStage = process.env.STAGE === 'dev';
function getFinalPath(command: string) {
  const isSSR = projectType === 'SSR' || process.env.PROJECTTYPE === 'SSR';
  let scriptPath, symlinkPath;
  if (isSSR) {
    scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack-ssr/dist/scripts/${command}.js`);
    symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack-ssr/dist/scripts/${command}.js`);
  } else {
    scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
    symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
  }
  return isDevStage ? symlinkPath : scriptPath;
}

export const webpackTask = async (command: 'build' | 'serve', args: Args): Promise<void> => {
  const finalPath = getFinalPath(command);
  if (!checkFileExist([finalPath])) { return; }

  const nodeEnv = command === 'serve' ? 'development' : 'production';
  const { modules } = args;
  const parsedModules = parseModules(modules);

  let buildEnv = 'integrate testing';
  if (command === 'build') {
    const envAnswer = await inquirer.prompt({
      type: 'list',
      name: 'buildEnv',
      message: 'please chioce one environment to build',
      choices: ['Integrate Testing', 'Production']
    }) as any;

    buildEnv = envAnswer.buildEnv;
    console.log(`current build environment is: ${chalk.green(buildEnv)}`);
  }

  executeNodeScript('node', finalPath,
    '--NODE_ENV', nodeEnv,
    '--BUILD_ENV', buildEnv === 'Production' ? 'prod' : 'inte',
    '--ART_MODULES', `${JSON.stringify(parsedModules)}`,
  );
};

export const webpackDll = () => {
  const dllScript = getFinalPath('dll');

  executeNodeScript('node', dllScript);
};