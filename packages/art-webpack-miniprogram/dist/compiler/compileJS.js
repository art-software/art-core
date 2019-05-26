"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathResolve = __importStar(require("resolve"));
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const gulp_typescript_1 = __importDefault(require("gulp-typescript"));
const paths_1 = __importDefault(require("../config/paths"));
const gulp_babel_1 = __importDefault(require("gulp-babel"));
const path_1 = require("path");
const dependencyMapping_1 = require("./dependencyMapping");
const compileNpm_1 = require("./compileNpm");
const babelConfig_1 = require("../config/babelConfig");
const gulpAstTransform_1 = require("./gulpAstTransform");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const isNpmDependency_1 = require("../utils/isNpmDependency");
const chalk_1 = __importDefault(require("chalk"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
exports.compileJS = (path) => {
    const tsProject = gulp_typescript_1.default.createProject(paths_1.default.appTsConfig);
    const importAsts = [];
    const filePath = path_1.join(paths_1.default.appCwd, path);
    return new Promise((resolve) => {
        // TODO add tslint checker?
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(gulpAstTransform_1.gulpAstTransform({
            visitImportDeclaration(astPath) {
                const importNode = astPath.node;
                const source = importNode.source.value;
                if (typeof source !== 'string') {
                    return this.traverse(astPath);
                }
                const resolvedPath = pathResolve.sync(source, {
                    basedir: path_1.dirname(filePath) + '/',
                    extensions: ['.ts', '.js']
                });
                if (!isNpmDependency_1.isNpmDependency(resolvedPath)) {
                    return this.traverse(astPath);
                }
                if (importNode.comments) {
                    importNode.comments.length = 0;
                }
                importAsts.push(resolvedPath);
                const relativePath = path_1.relative(path_1.join(path.replace('client', projectVirtualPath), '..'), projectVirtualPath + '/lib');
                importNode.source.value = path_1.join(relativePath, source);
                this.traverse(astPath);
            }
        }, () => {
            const uniqueDependencies = [];
            importAsts.forEach((resolvedPath) => {
                if (!uniqueDependencies.includes(resolvedPath)) {
                    uniqueDependencies.push(resolvedPath);
                }
            });
            if (uniqueDependencies.length) {
                console.log(chalk_1.default.cyan('Node_modules imports:'));
                uniqueDependencies.forEach((dep) => {
                    console.log(path_1.relative(paths_1.default.appCwd, dep));
                });
            }
            dependencyMapping_1.DependencyMapping.setMapping(path, uniqueDependencies);
            // if this file does not has npm dependencies, no npm compilation need.
            if (uniqueDependencies.length) {
                compileNpm_1.compileNpm(path);
            }
        }))
            .pipe(tsProject()) // TODO remove typeScript semantic errors
            .pipe(gulp_babel_1.default(babelConfig_1.babelConfig))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .on('end', resolve);
    });
};
