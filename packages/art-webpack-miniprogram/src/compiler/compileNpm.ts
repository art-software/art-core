import { DependencyMapping } from './dependencyMapping';
import paths from '../config/paths';
import vfs from 'vinyl-fs';
import { dependencyTree } from './dependencyTree';
import { getSrcOptions, handleErros, getDest } from '../utils/vfsHelper';
import plumber from 'gulp-plumber';
import gulpTs from 'gulp-typescript';
import gulpBabel from 'gulp-babel';
import { babelConfig } from '../config/babelConfig';
import { join, dirname, relative } from 'path';
import chalk from 'chalk';
import * as pathResolve from 'resolve';
import { isNpmDependency } from '../utils/isNpmDependency';
import through2 from 'through2';
import recast from 'recast';

const getAllNpmDependencies = (): string[] => {
  const allNpmDependencies: string[] = [];
  const npmMapping = DependencyMapping.getAllMapping();
  npmMapping.forEach((deps) => {
    deps.forEach((dep) => {
      if (allNpmDependencies.includes(dep)) { return; }
      allNpmDependencies.push(dep);
    });
  });

  return allNpmDependencies;
};

export const compileNpm = (filePath: string) => {

  const fileNpmDependencies = DependencyMapping.getMapping(filePath) || [];
  if (fileNpmDependencies.length === 0) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  const npmDependencies = dependencyTree(fileNpmDependencies);
  console.log(chalk.cyan('Dependencies tree:'));
  const uniqueNpmDependencies: string[] = [];
  npmDependencies.forEach((dep) => {
    if (!uniqueNpmDependencies.includes(dep)) {
      const isWillCompiledDependency = DependencyMapping.getWillCompiledDependencies().includes(dep);
      console.log(`${relative(process.cwd(), dep)}${isWillCompiledDependency ? ' (Duplicated)' : ''}`);
      if (isWillCompiledDependency) {
        return;
      }
      DependencyMapping.setWillCompiledDependencies(dep);
      uniqueNpmDependencies.push(dep);
    }
  });

  const rootDir = process.env.STAGE === 'dev' ?
    join(paths.appCwd, '../../node_modules/') : paths.appNodeModules;
  const tsProject = gulpTs.createProject(paths.appTsConfig, { rootDir });

  return new Promise((resolve) => {
    vfs.src(uniqueNpmDependencies, getSrcOptions({ base: rootDir, resolveSymlinks: false }))
      .pipe(plumber(handleErros))
      .pipe(through2.obj(function (file, encoding, callback) {
        const inputSource = file.contents.toString(encoding);
        const ast = recast.parse(inputSource, {
          sourceFileName: file.relative,
          tokens: false,
          parser: require('recast/parsers/typescript')
        });

        recast.visit(ast, {
          visitImportDeclaration(astPath) {
            const importNode = astPath.node;
            const source = importNode.source.value;

            if (typeof source !== 'string') { return this.traverse(astPath); }
            const resolvedPath = pathResolve.sync(source, {
              basedir: dirname(file.path) + '/',
              extensions: ['.ts', '.js']
            });

            if (!isNpmDependency(resolvedPath)) { return this.traverse(astPath); }

            const currentFileDeep = relative(dirname(file.path), rootDir);
            const resolvedFilePath = relative(rootDir, resolvedPath).replace('.ts', '.js');
            const newImportPath = currentFileDeep + '/' + resolvedFilePath;

            importNode.source.value = newImportPath;
            this.traverse(astPath);
          }
        });

        const output = recast.print(ast);

        file.contents = new Buffer(output.code);

        callback(null, file);
      }))
      .pipe(tsProject())
      .pipe(gulpBabel(babelConfig))
      .pipe(getDest(vfs, 'lib'))
      .on('end', () => {
        resolve();
      });
  });
};