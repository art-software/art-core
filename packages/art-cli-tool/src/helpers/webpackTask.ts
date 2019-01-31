import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { getWebpackScriptPath } from './getWebpackScriptPath';

interface Args {
  modules: string;
}

export const webpackTask = async (command: 'build' | 'serve', args: Args): Promise<void> => {
  const finalPath = getWebpackScriptPath(command);
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
  const dllScript = getWebpackScriptPath('dll');

  executeNodeScript('node', dllScript);
};