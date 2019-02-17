import { Configuration } from 'webpack';
import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpTs from 'gulp-typescript';
import paths from '../config/paths';
import gulpBabel from 'gulp-babel';
import { join } from 'path';
import { dependencyExtractor } from './dependencyExtractor';
import { DependencyMapping } from './dependencyMapping';
import chalk from 'chalk';
import { compileNpm } from './compileNpm';
import { babelConfig } from '../config/babelConfig';

export const compileJS = (path: string, webpackConfig: Configuration) => {
  const tsProject = gulpTs.createProject(paths.appTsConfig);

  const filePath = join(paths.appCwd, path);
  const dependencies = dependencyExtractor(filePath);
  const mapping = DependencyMapping.setMapping(path, dependencies);
  console.log(chalk.green('Current mapping: '), mapping);

  compileNpm();

  return new Promise((resolve) => {

    // TODO add tslint checker?
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(tsProject())
      .pipe(gulpBabel(babelConfig))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};