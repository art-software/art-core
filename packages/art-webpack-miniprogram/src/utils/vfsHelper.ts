import notify from 'gulp-notify';
import minimatch from 'minimatch';
import appConfig from '../config/appConfig';
import { join } from 'path';
import { isProd } from './env';
import paths from '../config/paths';
import vfs from 'vinyl-fs';
import { FileTypes } from '../enums/FileTypes';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

export const handleErros = (error: NodeJS.ErrnoException) => {
  notify.onError({
    title:    'Compiler Error',
    subtitle: 'Failure!',
    message:  '\nError: <%= error.message %>',
    sound:    'Beep'
  });
};

export const fileTypeChecker = (type: FileTypes, filePath: string) => {
  const mimeTypes = {
    image: '**/*.{jpg,jpeg,png,gif,svg}',
    imageNative: '**/*{.native,-native}.{jpg,jpeg,png,gif,svg}',
    xml: '**/*.{xml,html,wxml}',
    json: '**/*.json',
    scripts: '**/*.{ts,js,mjs}',
    less: '**/*.{less,wxss}',
    lessIgnore: '**/*{.ignore,-ignore}.{less,wxss}'
  };
  if (filePath) {
    return minimatch(filePath, mimeTypes[type]);
  } else {
    return mimeTypes[type];
  }
};

export const getDest = (vfsInstance: typeof vfs, path: string = '') => {
  const dest = join(
    isProd() ? paths.appPublic : paths.appDebug,
    projectVirtualPath,
    path
  );
  return vfsInstance.dest(dest, { cwd: paths.appCwd });
};

export const getSrcOptions = (options?: vfs.SrcOptions) => {
  const vfsOption = { cwd: paths.appCwd, base: 'client' };
  return Object.assign({}, vfsOption, options);
};