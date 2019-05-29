import * as pathResolve from 'resolve';
import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpTs from 'gulp-typescript';
import paths from '../config/paths';
import gulpBabel from 'gulp-babel';
import { join, dirname, relative } from 'path';
import { DependencyMapping } from './dependencyMapping';
import { compileNpm } from './compileNpm';
import { babelConfig } from '../config/babelConfig';
import { gulpAstTransform } from './gulpAstTransform';
import appConfig from '../config/appConfig';
import { isNpmDependency } from '../utils/isNpmDependency';
import chalk from 'chalk';
import { gulpTsReporter } from './gulpTsReporter';
import { dependencyTree } from './dependencyTree';
import { removeSync } from 'fs-extra';
import { cleanEmptyFoldersRecursively } from 'art-dev-utils/lib/cleanEmptyFoldersRecursively';
import gulpUglify from 'gulp-uglify';
import { isProd } from '../utils/env';
import gulpif from 'gulp-if';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

export const compileJS = (path: string) => {
  const tsProject = gulpTs.createProject(paths.appTsConfig);
  const importAsts: string[] = [];

  const filePath = join(paths.appCwd, path);

  return new Promise((resolve) => {

    // TODO add tslint checker?
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpAstTransform({
        visitImportDeclaration(astPath) {
          const importNode = astPath.node;
          const source = importNode.source.value;

          if (typeof source !== 'string') { return this.traverse(astPath); }

          const resolvedPath = pathResolve.sync(source, {
            basedir: dirname(filePath) + '/',
            extensions: ['.ts', '.js']
          });

          if (!isNpmDependency(resolvedPath)) { return this.traverse(astPath); }

          if (importNode.comments) {
            importNode.comments.length = 0;
          }

          importAsts.push(resolvedPath);

          const relativePath = relative(
            join(path.replace('client', projectVirtualPath), '..'),
            projectVirtualPath + '/lib'
          );

          importNode.source.value = join(relativePath, source);

          this.traverse(astPath);
        }
      }, () => {
        const uniqueDependencies: string[] = [];
        importAsts.forEach((resolvedPath) => {
          if (!uniqueDependencies.includes(resolvedPath)) {
            uniqueDependencies.push(resolvedPath);
          }
        });

        if (uniqueDependencies.length) {
          console.log(`${chalk.blue('=>')} ${chalk.green('Node_modules imports:')}`);
          uniqueDependencies.forEach((dep) => {
            console.log(relative(paths.appCwd, dep));
          });
        }
        const preDependencyMapping = DependencyMapping.getMapping(path);
        DependencyMapping.setMapping(path, uniqueDependencies);

        const deletedDependency: string[] = [];
        if (preDependencyMapping && preDependencyMapping.length) {
          preDependencyMapping.forEach((dep) => {
            if (!uniqueDependencies.includes(dep)) {
              deletedDependency.push(dep);
            }
          });
        }

        if (deletedDependency.length) {
          let allMapping: string[] = [];
          for (const value of DependencyMapping.getAllMapping().values()) {
            allMapping = allMapping.concat(value);
          }
          const deleteableDeps: string[] = [];
          deletedDependency.forEach((dep) => {
            if (!allMapping.includes(dep)) {
              deleteableDeps.push(dep);
            }
          });
          const deleteableDepsTree = dependencyTree(deleteableDeps);
          const rootDir = process.env.STAGE === 'dev' ?
            join(paths.appCwd, '../../node_modules/') : paths.appNodeModules;
          deleteableDepsTree.forEach((depPath) => {
            DependencyMapping.removeWillCompiledDependencies(depPath);

            const relativePath = relative(rootDir, depPath);
            const absDebugPath = join(process.cwd(), 'debug', projectVirtualPath, 'lib', relativePath);
            try {
              removeSync(absDebugPath);
              console.log(`${chalk.blue('=>')} Dependency file ${relative(process.cwd(), absDebugPath)} has been ${chalk.yellow('removed')}`);
            } catch (e) {
              console.log(`${chalk.red('REMOVE FILE ERROR ')} ${absDebugPath}`);
              console.log(e);
            }
          });

          // delete empty folders in debug/lib directory
          const debugLibPath = join(process.cwd(), 'debug', projectVirtualPath, 'lib');
          cleanEmptyFoldersRecursively(debugLibPath);
        }
        // DependencyMapping.setMapping(path, uniqueDependencies);
        // if this file does not has npm dependencies, no npm compilation need.
        if (uniqueDependencies.length) {
          compileNpm(path);
        }
      }))
      .pipe(tsProject(gulpTsReporter()))
      .pipe(gulpBabel(babelConfig))
      .pipe(gulpif(
        isProd(),
        gulpUglify({
          compress: {
            dead_code: true,
            drop_debugger: true,
            drop_console: true
          }
        })
      ))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};