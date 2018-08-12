import * as path from 'path';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import parseModules from 'art-dev-utils/lib/parseModules';

interface Args {
  modules: string;
}

export const webpackTask = (command: 'build' | 'serve', args: Args): void => {
  const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}`);
  if (!checkFileExist([scriptPath])) { return; }

  const nodeEnv = command === 'build' ? 'production' : 'development';
  const { modules } = args;
  const parsedModules = parseModules(modules);

  executeNodeScript('node', scriptPath,
    '--NODE_ENV', nodeEnv,
    '--ART_MODULES', `${JSON.stringify(parsedModules)}`,
  );
};