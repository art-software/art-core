"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyMapping_1 = require("./dependencyMapping");
const paths_1 = __importDefault(require("../config/paths"));
const path_1 = require("path");
const env_1 = require("../utils/env");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const rollup_plugin_commonjs_1 = __importDefault(require("rollup-plugin-commonjs"));
const rollup_plugin_node_resolve_1 = __importDefault(require("rollup-plugin-node-resolve"));
const rollup_plugin_babel_1 = __importDefault(require("rollup-plugin-babel"));
const rollup_plugin_typescript_1 = __importDefault(require("rollup-plugin-typescript"));
const babelConfig_1 = require("../config/babelConfig");
const rollup = require('rollup');
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
const getDist = () => {
    return path_1.join(env_1.isProd() ? paths_1.default.appPublic : paths_1.default.appDebug, projectVirtualPath, 'lib');
};
exports.compileNpm = () => {
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
            rollup_plugin_node_resolve_1.default({
                extensions: ['.mjs', '.js', '.ts', '.json']
            }),
            rollup_plugin_typescript_1.default({
                tsconfig: paths_1.default.appTsConfig
            }),
            rollup_plugin_commonjs_1.default({
                include: process.env.STAGE === 'dev' ?
                    path_1.join(paths_1.default.appCwd, '../../node_modules/**') :
                    paths_1.default.appNodeModules + '/**',
                extensions: ['.js', '.ts']
            }),
            rollup_plugin_babel_1.default(Object.assign({}, babelConfig_1.babelConfig, { babelrc: false }))
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
