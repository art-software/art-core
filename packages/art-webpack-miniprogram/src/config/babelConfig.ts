import paths from './paths';
import { join } from 'path';
import { existsSync } from 'fs';
import { readJSONSync } from 'fs-extra';

const defaultBabelConfig = {
  presets: ['@babel/preset-env']
};
const babelrcPath = join(paths.appCwd, '.babelrc');
const customBabelConfig = existsSync(babelrcPath) ?
  readJSONSync(join(paths.appCwd, '.babelrc')) : {};

export const babelConfig = Object.assign({}, defaultBabelConfig, customBabelConfig);