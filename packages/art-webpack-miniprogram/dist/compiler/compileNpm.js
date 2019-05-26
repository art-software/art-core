"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyMapping_1 = require("./dependencyMapping");
const paths_1 = __importDefault(require("../config/paths"));
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const dependencyTree_1 = require("./dependencyTree");
const vfsHelper_1 = require("../utils/vfsHelper");
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const gulp_typescript_1 = __importDefault(require("gulp-typescript"));
const gulp_babel_1 = __importDefault(require("gulp-babel"));
const babelConfig_1 = require("../config/babelConfig");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const pathResolve = __importStar(require("resolve"));
const isNpmDependency_1 = require("../utils/isNpmDependency");
const through2_1 = __importDefault(require("through2"));
const recast_1 = __importDefault(require("recast"));
exports.compileNpm = (filePath) => {
    const fileNpmDependencies = dependencyMapping_1.DependencyMapping.getMapping(filePath) || [];
    if (fileNpmDependencies.length === 0) {
        return new Promise((resolve) => {
            resolve();
        });
    }
    const npmDependencies = dependencyTree_1.dependencyTree(fileNpmDependencies);
    console.log(chalk_1.default.cyan('Dependencies tree:'));
    const uniqueNpmDependencies = [];
    npmDependencies.forEach((dep) => {
        if (!uniqueNpmDependencies.includes(dep)) {
            const isWillCompiledDependency = dependencyMapping_1.DependencyMapping.getWillCompiledDependencies().includes(dep);
            console.log(`${path_1.relative(process.cwd(), dep)}${isWillCompiledDependency ? ' (Duplicated)' : ''}`);
            if (isWillCompiledDependency) {
                return;
            }
            dependencyMapping_1.DependencyMapping.setWillCompiledDependencies(dep);
            uniqueNpmDependencies.push(dep);
        }
    });
    const rootDir = process.env.STAGE === 'dev' ?
        path_1.join(paths_1.default.appCwd, '../../node_modules/') : paths_1.default.appNodeModules;
    const tsProject = gulp_typescript_1.default.createProject(paths_1.default.appTsConfig, { rootDir });
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(uniqueNpmDependencies, vfsHelper_1.getSrcOptions({ base: rootDir, resolveSymlinks: false }))
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(through2_1.default.obj(function (file, encoding, callback) {
            const inputSource = file.contents.toString(encoding);
            const ast = recast_1.default.parse(inputSource, {
                sourceFileName: file.relative,
                tokens: false,
                parser: require('recast/parsers/typescript')
            });
            recast_1.default.visit(ast, {
                visitImportDeclaration(astPath) {
                    const importNode = astPath.node;
                    const source = importNode.source.value;
                    if (typeof source !== 'string') {
                        return this.traverse(astPath);
                    }
                    const resolvedPath = pathResolve.sync(source, {
                        basedir: path_1.dirname(file.path) + '/',
                        extensions: ['.ts', '.js']
                    });
                    if (!isNpmDependency_1.isNpmDependency(resolvedPath)) {
                        return this.traverse(astPath);
                    }
                    const currentFileDeep = path_1.relative(path_1.dirname(file.path), rootDir);
                    const resolvedFilePath = path_1.relative(rootDir, resolvedPath).replace('.ts', '.js');
                    const newImportPath = currentFileDeep + '/' + resolvedFilePath;
                    importNode.source.value = newImportPath;
                    this.traverse(astPath);
                }
            });
            const output = recast_1.default.print(ast);
            file.contents = new Buffer(output.code);
            callback(null, file);
        }))
            .pipe(tsProject())
            .pipe(gulp_babel_1.default(babelConfig_1.babelConfig))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default, 'lib'))
            .on('end', resolve);
    });
};
