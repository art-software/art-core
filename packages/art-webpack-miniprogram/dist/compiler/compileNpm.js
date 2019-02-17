"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyMapping_1 = require("./dependencyMapping");
const paths_1 = __importDefault(require("../config/paths"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const dependencyTree_1 = require("./dependencyTree");
const vfsHelper_1 = require("../utils/vfsHelper");
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const gulp_typescript_1 = __importDefault(require("gulp-typescript"));
const gulp_babel_1 = __importDefault(require("gulp-babel"));
const babelConfig_1 = require("../config/babelConfig");
const NPM = 'node_modules';
// TODO remove rollup totally?
// TODO local dependencies and npm dependencies
// import rollupCommonjs from 'rollup-plugin-commonjs';
// import rollupResolve from 'rollup-plugin-node-resolve';
// import rollupBabel from 'rollup-plugin-babel';
// import rollupTypescript from 'rollup-plugin-typescript';
// import { babelConfig } from '../config/babelConfig';
// const rollup = require('rollup');
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
const getAllNpmDependencies = () => {
    const allNpmDependencies = [];
    const npmMapping = dependencyMapping_1.DependencyMapping.getAllMapping();
    npmMapping.forEach((deps) => {
        deps.forEach((dep) => {
            if (allNpmDependencies.includes(dep)) {
                return;
            }
            allNpmDependencies.push(dep);
        });
    });
    return allNpmDependencies;
};
const getDistRelativePath = (filePath) => {
    const i = filePath.lastIndexOf(NPM) + NPM.length;
    return filePath.slice(i);
};
exports.compileNpm = () => {
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
    const npmDependencies = dependencyTree_1.dependencyTree(allNpmDependencies);
    const tsProject = gulp_typescript_1.default.createProject(paths_1.default.appTsConfig);
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(npmDependencies, vfsHelper_1.getSrcOptions({ base: '/Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public' }))
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(tsProject())
            .pipe(gulp_babel_1.default(babelConfig_1.babelConfig))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default, 'lib'))
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
