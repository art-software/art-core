import { DependencyMapping } from './dependencyMapping';
import paths from '../config/paths';
import { join } from 'path';
import { isProd } from '../utils/env';
import appConfig from '../config/appConfig';
import rollupCommonjs from 'rollup-plugin-commonjs';
import rollupResolve from 'rollup-plugin-node-resolve';
import rollupBabel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript';
import { babelConfig } from '../config/babelConfig';
const rollup = require('rollup');

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

const getDist = () => {
  return join(
    isProd() ? paths.appPublic : paths.appDebug,
    projectVirtualPath,
    'lib'
  );
};

export const compileNpm = () => {
  const allNpmDependencies = getAllNpmDependencies();
  console.log('allNpmDependencies: ', allNpmDependencies);
  if (allNpmDependencies.length === 0) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  return rollup.rollup({
    input: allNpmDependencies,
    plugins: [
      rollupResolve({
        extensions: [ '.mjs', '.js', '.ts', '.json' ]
      }),
      rollupTypescript({
        tsconfig: paths.appTsConfig
      }),
      rollupCommonjs({
        include: process.env.STAGE === 'dev' ?
          join(paths.appCwd, '../../node_modules/**') :
          paths.appNodeModules + '/**',
        extensions: [ '.js', '.ts' ]
      }),
      rollupBabel(
        Object.assign({}, babelConfig, { babelrc: false })
      )
    ]
  })
  .then((bundles) => {
    return bundles.write({
      dir: getDist(),
      format: 'cjs',
      exports: 'named'
    });
  });
};