"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const paths_js_1 = __importDefault(require("../config/paths.js"));
const FileNames_js_1 = require("../constants/FileNames.js");
const compileProjectConfig_1 = require("./compileProjectConfig");
const miniprogramWebpackEntry_1 = require("../config/miniprogramWebpackEntry");
const vfsHelper_1 = require("../utils/vfsHelper");
const compileJS_1 = require("./compileJS");
const chalk_1 = __importDefault(require("chalk"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const env_js_1 = require("../utils/env.js");
const fs_extra_1 = require("fs-extra");
const compileLess_1 = require("./compileLess");
const fileQueue = [];
class MiniProgramCompiler {
    constructor(webpackConfig) {
        this.ready = (watcherDone) => {
            return () => {
                Promise.all(fileQueue)
                    .then(() => {
                    fileQueue.length = 0;
                    const debugProjectConfigPath = path_1.join(paths_js_1.default.appDebug, miniprogramWebpackEntry_1.miniprogramWebpackEntry().entryKey, FileNames_js_1.PROJECTCONFIG);
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
            fileQueue.push(new Promise((resolve, reject) => {
                this.execCompileTask(path)
                    .then(() => {
                    console.log(`${chalk_1.default.blue('=>')} File ${chalk_1.default.cyan(path)} added`);
                    resolve(path);
                })
                    .catch(reject);
            }));
        };
        this.remove = (path) => {
            const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
            const fileCompiledPath = path_1.join(env_js_1.isProd() ? paths_js_1.default.appPublic : paths_js_1.default.appDebug, projectVirtualPath, path.replace('client', '')).replace(/.less$/i, '.wxss').replace(/.ts$/i, '.js');
            fs_extra_1.removeSync(fileCompiledPath);
            console.log(`${chalk_1.default.blue('=>')} File ${chalk_1.default.cyan(path)} was removed`);
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
        this.webpackConfig = webpackConfig;
    }
    execCompileTask(filePath) {
        if (vfsHelper_1.fileTypeChecker('scripts', filePath)) {
            return compileJS_1.compileJS(filePath, this.webpackConfig);
        }
        if (vfsHelper_1.fileTypeChecker('less', filePath)) {
            return compileLess_1.compileLess(filePath, this.webpackConfig);
        }
        // TODO Remove it later
        return compileJS_1.compileJS(filePath, this.webpackConfig);
    }
}
exports.MiniProgramCompiler = MiniProgramCompiler;
