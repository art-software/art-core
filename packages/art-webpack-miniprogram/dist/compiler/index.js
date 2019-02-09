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
const fileQueue = [];
class MiniProgramCompiler {
    constructor(webpackConfig) {
        this.webpackConfig = webpackConfig;
    }
    execCompileTask(filePath) {
        if (vfsHelper_1.fileTypeChecker('scripts', filePath)) {
            return compileJS_1.compileJS(filePath, this.webpackConfig);
        }
        // TODO Remove it later
        return compileJS_1.compileJS(filePath, this.webpackConfig);
    }
    add(path) {
        fileQueue.push(new Promise((resolve, reject) => {
            this.execCompileTask(path)
                .then(() => {
                console.log(`${chalk_1.default.blue('=>')} File ${chalk_1.default.cyan(path)} was added`);
                resolve(path);
            })
                .catch(reject);
        }));
    }
    ready(watcherDone) {
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
    }
}
exports.MiniProgramCompiler = MiniProgramCompiler;
