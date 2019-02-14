"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const gulp_typescript_1 = __importDefault(require("gulp-typescript"));
const paths_1 = __importDefault(require("../config/paths"));
const gulp_babel_1 = __importDefault(require("gulp-babel"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const dependencyExtractor_1 = require("./dependencyExtractor");
const dependencyMapping_1 = require("./dependencyMapping");
const chalk_1 = __importDefault(require("chalk"));
const compileNpm_1 = require("./compileNpm");
const defaultBabelConfig = {
    presets: ['@babel/preset-env']
};
const babelrcPath = path_1.join(paths_1.default.appCwd, '.babelrc');
const customBabelConfig = fs_extra_1.existsSync(babelrcPath) ?
    fs_extra_1.readJSONSync(path_1.join(paths_1.default.appCwd, '.babelrc')) : {};
exports.compileJS = (path, webpackConfig) => {
    const tsProject = gulp_typescript_1.default.createProject(paths_1.default.appTsConfig);
    const babelConfig = Object.assign({}, defaultBabelConfig, customBabelConfig);
    const filePath = path_1.join(paths_1.default.appCwd, path);
    const dependencies = dependencyExtractor_1.dependencyExtractor(filePath);
    const mapping = dependencyMapping_1.DependencyMapping.setMapping(path, dependencies);
    console.log(chalk_1.default.green('Current mapping: '), mapping);
    compileNpm_1.compileNpm(webpackConfig);
    return new Promise((resolve) => {
        // TODO add tslint checker?
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(tsProject())
            .pipe(gulp_babel_1.default(babelConfig))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .on('end', resolve);
    });
};
