import * as path from 'path';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';

interface Args {
  modules: string;
}

const isDevStage = process.env.STAGE === 'dev';
function getFinalPath(command: string) {
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
  const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
  return isDevStage ? symlinkPath : scriptPath;
}

export const webpackTask = (command: 'build' | 'serve', args: Args): void => {
  const finalPath = getFinalPath(command);
  if (!checkFileExist([finalPath])) { return; }

  const nodeEnv = command === 'serve' ? 'development' : 'production';
  const { modules } = args;
  const parsedModules = parseModules(modules);

  executeNodeScript('node', finalPath,
    '--NODE_ENV', nodeEnv,
    '--ART_MODULES', `${JSON.stringify(parsedModules)}`,
  );
};

export const webpackDll = () => {
  const dllScript = getFinalPath('dll');

  executeNodeScript('node', dllScript);
};