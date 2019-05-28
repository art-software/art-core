"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const paths_1 = __importDefault(require("../config/paths"));
const FileNames_1 = require("../constants/FileNames");
const compileProjectConfig_1 = require("./compileProjectConfig");
const miniprogramWebpackEntry_1 = require("../config/miniprogramWebpackEntry");
const vfsHelper_1 = require("../utils/vfsHelper");
const compileJS_1 = require("./compileJS");
const chalk_1 = __importDefault(require("chalk"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const env_1 = require("../utils/env");
const fs_extra_1 = require("fs-extra");
const compileLess_1 = require("./compileLess");
const FileTypes_1 = require("../enums/FileTypes");
const compileWxml_1 = require("./compileWxml");
const compileJSON_1 = require("./compileJSON");
const compileImage_1 = require("./compileImage");
const compileExtra_1 = require("./compileExtra");
const dependencyMapping_1 = require("./dependencyMapping");
const dependencyTree_1 = require("./dependencyTree");
const cleanEmptyFoldersRecursively_1 = require("art-dev-utils/lib/cleanEmptyFoldersRecursively");
const fileQueue = [];
class MiniProgramCompiler {
    constructor() {
        this.ready = (watcherDone) => {
            return () => {
                Promise.all(fileQueue)
                    .then(() => {
                    fileQueue.length = 0;
                    const debugProjectConfigPath = path_1.join(paths_1.default.appDebug, miniprogramWebpackEntry_1.miniprogramWebpackEntry().entryKey, FileNames_1.PROJECTCONFIG);
                    compileProjectConfig_1.compileProjectConfig({ projectConfigPath: debugProjectConfigPath })
                        .then(() => {
                        if (watcherDone) {
                            watcherDone();
                        }
                    });
                });
            };
        };
        this.add = (path) => {
            console.log(`${chalk_1.default.blue('=>')} ${chalk_1.default.green('Start add:')} ${path}`);
            fileQueue.push(new Promise((resolve, reject) => {
                this.execCompileTask(path)
                    .then(() => {
                    console.log(`${chalk_1.default.blue('=>')} ${path} ${chalk_1.default.green('added')}`);
                    resolve(path);
                })
                    .catch(reject);
            }));
        };
        this.remove = (path) => {
            const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
            const fileCompiledPath = path_1.join(env_1.isProd() ? paths_1.default.appPublic : paths_1.default.appDebug, projectVirtualPath, path.replace('client', '')).replace(/.less$/i, '.wxss').replace(/.ts$/i, '.js');
            try {
                fs_extra_1.removeSync(fileCompiledPath);
                console.log(`${chalk_1.default.blue('=>')} ${path} has been ${chalk_1.default.yellow('removed')}`);
            }
            catch (e) {
                console.log(`${chalk_1.default.red('REMOVE FILE ERROR ')} ${path}`);
                console.log(e);
            }
            // update dependencies mapping
            if (vfsHelper_1.fileTypeChecker(FileTypes_1.FileTypes.scripts, fileCompiledPath)) {
                const depsMapping = dependencyMapping_1.DependencyMapping.getMapping(path);
                if (!depsMapping) {
                    return;
                }
                const mapping = dependencyMapping_1.DependencyMapping.deleteMapping(path);
                let allMapping = [];
                for (const value of mapping.values()) {
                    allMapping = allMapping.concat(value);
                }
                const deleteableDeps = [];
                depsMapping.forEach((dep) => {
                    if (!allMapping.includes(dep)) {
                        deleteableDeps.push(dep);
                    }
                });
                const deleteableDepsTree = dependencyTree_1.dependencyTree(deleteableDeps);
                const rootDir = process.env.STAGE === 'dev' ?
                    path_1.join(paths_1.default.appCwd, '../../node_modules/') : paths_1.default.appNodeModules;
                deleteableDepsTree.forEach((filePath) => {
                    dependencyMapping_1.DependencyMapping.removeWillCompiledDependencies(filePath);
                    const relativePath = path_1.relative(rootDir, filePath);
                    const absDebugPath = path_1.join(process.cwd(), 'debug', projectVirtualPath, 'lib', relativePath);
                    try {
                        fs_extra_1.removeSync(absDebugPath);
                        console.log(`${chalk_1.default.blue('=>')} Dependency file ${path_1.relative(process.cwd(), absDebugPath)} has been ${chalk_1.default.yellow('removed')}`);
                    }
                    catch (e) {
                        console.log(`${chalk_1.default.red('REMOVE FILE ERROR ')} ${absDebugPath}`);
                        console.log(e);
                    }
                });
                const debugLibPath = path_1.join(process.cwd(), 'debug', projectVirtualPath, 'lib');
                cleanEmptyFoldersRecursively_1.cleanEmptyFoldersRecursively(debugLibPath);
            }
        };
        this.change = (path) => {
            console.log(`${chalk_1.default.blue('=>')} File ${chalk_1.default.cyan(path)} changed, ${chalk_1.default.magenta('transforming')}...`);
            this.execCompileTask(path)
                .then(() => {
                console.log(`${chalk_1.default.blue('=>')} File ${chalk_1.default.cyan(path)} transform ${chalk_1.default.magenta('done')}`);
            })
                .catch((err) => {
                console.log(err);
            });
        };
    }
    execCompileTask(filePath) {
        if (vfsHelper_1.fileTypeChecker(FileTypes_1.FileTypes.scripts, filePath)) {
            return compileJS_1.compileJS(filePath);
        }
        if (vfsHelper_1.fileTypeChecker(FileTypes_1.FileTypes.less, filePath)) {
            return compileLess_1.compileLess(filePath);
        }
        if (vfsHelper_1.fileTypeChecker(FileTypes_1.FileTypes.xml, filePath)) {
            return compileWxml_1.compileWxml(filePath);
        }
        if (vfsHelper_1.fileTypeChecker(FileTypes_1.FileTypes.json, filePath)) {
            return compileJSON_1.compileJSON(filePath);
        }
        if (vfsHelper_1.fileTypeChecker(FileTypes_1.FileTypes.image, filePath)) {
            // return new Promise((resolve) => { return resolve(); });
            return compileImage_1.compileImage(filePath);
        }
        return compileExtra_1.compileExtra(filePath);
    }
}
exports.MiniProgramCompiler = MiniProgramCompiler;
