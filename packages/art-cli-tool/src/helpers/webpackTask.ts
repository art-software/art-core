import * as path from 'path';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';
import inquirer from 'inquirer';

interface Args {
  modules: string;
}

const isDevStage = process.env.STAGE === 'dev';
function getFinalPath(command: string) {
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
  const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
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
  }

  console.log(`buildEnv: ${buildEnv}`);
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