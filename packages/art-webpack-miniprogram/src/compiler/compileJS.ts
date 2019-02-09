import { Configuration } from 'webpack';
import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest } from '../utils/vfsHelper';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

const composeWebpackEntry = (filePath: string) => {
  const entry = {};
  const realPath = filePath.split('client')[1];
  entry[`${realPath.replace('.ts', '.js')}`] = filePath;
  return entry;
};

export const compileJS = (path: string, webpackConfig: Configuration) => {
  Object.assign(webpackConfig, {
    entry: composeWebpackEntry(path)
  });

  return new Promise((resolve) => {

    vfs.src(path)
      .pipe(plumber(handleErros))
      .pipe(webpackStream(webpackConfig, webpack as any, () => {}))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};