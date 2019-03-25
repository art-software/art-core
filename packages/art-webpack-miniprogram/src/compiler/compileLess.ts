import { Configuration } from 'webpack';
import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import { isProd } from '../utils/env';
import paths from '../config/paths';
import appConfig from '../config/appConfig';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

const composeWebpackEntry = (filePath: string) => {
  console.log('filePath: ', filePath);
  const entry = {};
  const realPath = filePath.split('client')[1];
  entry[`${realPath.replace('.less', '.wxss')}`] = filePath;
  return entry;
};

export const compileLess = (path: string, webpackConfig: Configuration) => {
  const newWebpackConfig = Object.assign({}, webpackConfig, {
    entry: composeWebpackEntry(path)
  });
  // delete (newWebpackConfig.output as any).filename;

  return new Promise((resolve) => {

    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(webpackStream(newWebpackConfig, webpack as any, () => {}))
      .pipe(getDest(vfs))
      .pipe(vfs.dest(
        isProd() ? paths.appPublic : paths.appDebug
      ))
      .on('end', resolve);
  });
};