import { Configuration } from 'webpack';
import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
// import webpackStream from 'webpack-stream';
// import webpack from 'webpack';
import gulpTs from 'gulp-typescript';
import paths from '../config/paths';
import gulpBabel from 'gulp-babel';
import { readJSONSync, existsSync } from 'fs-extra';
import { join } from 'path';

// const composeWebpackEntry = (filePath: string) => {
//   const entry = {};
//   const realPath = filePath.split('client')[1];
//   entry[`${realPath.replace('.ts', '.js')}`] = filePath;
//   return entry;
// };

const defaultBabelConfig = {
  presets: ['@babel/preset-env']
};
const babelrcPath = join(paths.appCwd, '.babelrc');
const customBabelConfig = existsSync(babelrcPath) ?
  readJSONSync(join(paths.appCwd, '.babelrc')) : {};

export const compileJS = (path: string, webpackConfig: Configuration) => {
  // const newWebpackConfig = Object.assign({}, webpackConfig, {
  //   entry: composeWebpackEntry(path)
  // });

  const tsProject = gulpTs.createProject(paths.appTsConfig);
  const babelConfig = Object.assign({}, defaultBabelConfig, customBabelConfig);
  return new Promise((resolve) => {

    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      // .pipe(webpackStream(newWebpackConfig, webpack as any, () => {}))
      .pipe(tsProject())
      .pipe(gulpBabel(babelConfig))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};