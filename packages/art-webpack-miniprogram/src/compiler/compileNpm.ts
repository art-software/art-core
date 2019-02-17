import { DependencyMapping } from './dependencyMapping';
import paths from '../config/paths';
import { join } from 'path';
import { isProd } from '../utils/env';
import appConfig from '../config/appConfig';
import vfs from 'vinyl-fs';
import { dependencyTree } from './dependencyTree';
import { getSrcOptions, handleErros, getDest } from '../utils/vfsHelper';
import plumber from 'gulp-plumber';
import gulpTs from 'gulp-typescript';
import gulpBabel from 'gulp-babel';
import { babelConfig } from '../config/babelConfig';
const NPM = 'node_modules';
// TODO remove rollup totally?
// TODO local dependencies and npm dependencies
// import rollupCommonjs from 'rollup-plugin-commonjs';
// import rollupResolve from 'rollup-plugin-node-resolve';
// import rollupBabel from 'rollup-plugin-babel';
// import rollupTypescript from 'rollup-plugin-typescript';
// import { babelConfig } from '../config/babelConfig';
// const rollup = require('rollup');

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

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

const getDistRelativePath = (filePath: string) => {
  const i = filePath.lastIndexOf(NPM) + NPM.length;
  return filePath.slice(i);
};

export const compileNpm = () => {
  const allNpmDependencies = getAllNpmDependencies();
  console.log('allNpmDependencies: ', allNpmDependencies);
  if (allNpmDependencies.length === 0) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // const npmDependencies = dependencyTree(allNpmDependencies).map((dep) => {
  //   const i = dep.lastIndexOf(NPM) + NPM.length;
  //   return dep.slice(i);
  // });

  const npmDependencies = dependencyTree(allNpmDependencies);

  const tsProject = gulpTs.createProject(paths.appTsConfig);

  return new Promise((resolve) => {
    vfs.src(npmDependencies, getSrcOptions({ base: '/Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public' }))
      .pipe(plumber(handleErros))
      .pipe(tsProject())
      .pipe(gulpBabel(babelConfig))
      .pipe(getDest(vfs, 'lib'))
      .on('end', resolve);
  });

  // return rollup.rollup({
  //   input: allNpmDependencies,
  //   plugins: [
  //     rollupResolve({
  //       extensions: [ '.mjs', '.js', '.ts', '.json' ]
  //     }),
  //     rollupTypescript({
  //       tsconfig: paths.appTsConfig
  //     }),
  //     rollupCommonjs({
  //       include: process.env.STAGE === 'dev' ?
  //         join(paths.appCwd, '../../node_modules/**') :
  //         paths.appNodeModules + '/**',
  //       extensions: [ '.js', '.ts' ]
  //     }),
  //     rollupBabel(
  //       Object.assign({}, babelConfig, { babelrc: false })
  //     )
  //   ]
  // })
  // .then((bundles) => {
  //   return bundles.write({
  //     dir: getDist(),
  //     format: 'cjs',
  //     exports: 'named'
  //   });
  // });
};