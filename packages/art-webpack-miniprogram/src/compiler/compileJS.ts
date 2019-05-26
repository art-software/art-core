import * as pathResolve from 'resolve';
import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpTs from 'gulp-typescript';
import paths from '../config/paths';
import gulpBabel from 'gulp-babel';
import { join, dirname, relative } from 'path';
import { dependencyExtractor } from './dependencyExtractor';
import { DependencyMapping } from './dependencyMapping';
import { compileNpm } from './compileNpm';
import { babelConfig } from '../config/babelConfig';
import { gulpAstTransform } from './gulpAstTransform';
import appConfig from '../config/appConfig';
import { isNpmDependency } from '../utils/isNpmDependency';
import chalk from 'chalk';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

export const compileJS = (path: string) => {
  const tsProject = gulpTs.createProject(paths.appTsConfig);

  const filePath = join(paths.appCwd, path);
  const dependencies = dependencyExtractor(filePath);
  if (dependencies.length) {
    console.log(chalk.cyan('Node_modules imports:'));
    dependencies.forEach((dep) => {
      console.log(relative(paths.appCwd, dep));
    });
  }
  DependencyMapping.setMapping(path, dependencies);

  // if this file does not has npm dependencies, no npm compilation need.
  if (dependencies.length) {
    compileNpm(path);
  }

  return new Promise((resolve) => {

    // TODO add tslint checker?
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpAstTransform({ // TODO simplify dependencyExtractor
        visitImportDeclaration(astPath) {
          const importNode = astPath.node;
          const source = importNode.source.value;

          if (typeof source !== 'string') { return this.traverse(astPath); }

          const resolvedPath = pathResolve.sync(source, {
            basedir: dirname(filePath) + '/',
            extensions: ['.ts', '.js']
          });

          if (!isNpmDependency(resolvedPath)) { return this.traverse(astPath); }

          const relativePath = relative(
            path.replace('client', projectVirtualPath) + '/..', // TODO not elegant enough
            projectVirtualPath + '/lib'
          );

          importNode.source.value = join(relativePath, source);

          this.traverse(astPath);
        }
      }))
      .pipe(tsProject()) // TODO remove typeScript semantic errors
      .pipe(gulpBabel(babelConfig))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};