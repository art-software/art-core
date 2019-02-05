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
const fileQueue = [];
class MiniProgramCompiler {
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
