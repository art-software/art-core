import * as path from 'path';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';
import chalk from 'chalk';

interface Args {
  modules: string;
}

const isDevStage = process.env.STAGE === 'dev';
function getFinalPath(command: string) {
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
  const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
  return isDevStage ? symlinkPath : scriptPath;
}

export const moduleTask = (command: 'publish', args: Args) => {
  const finalPath = getFinalPath(command);
  if (!checkFileExist([finalPath])) {
    if (command === 'publish') {
      chalk.black.bold('please make sure art-webpack version is higher than or equal to v0.0.12');
    }
    return;
  }

  const { modules } = args;
  const parsedModules = parseModules(modules);

  executeNodeScript('node', finalPath,
    '--BUILD_ENV', 'inte',
    '--ART_MODULES', `${JSON.stringify(parsedModules)}`,
  );
};