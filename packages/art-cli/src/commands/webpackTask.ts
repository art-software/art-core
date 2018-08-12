import * as path from 'path';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';

interface Args {
  modules: string;
}

export const webpackTask = (command: 'build' | 'serve', args: Args): void => {
  const isDevStage = process.env.STAGE === 'dev';
  console.log('isDevStage: ', isDevStage);
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
  const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
  const finalPath = isDevStage ? symlinkPath : scriptPath;
  if (!checkFileExist([finalPath])) { return; }

  const nodeEnv = command === 'build' ? 'production' : 'development';
  const { modules } = args;
  const parsedModules = parseModules(modules);

  executeNodeScript('node', finalPath,
    '--NODE_ENV', nodeEnv,
    '--ART_MODULES', `${JSON.stringify(parsedModules)}`,
  );
};