"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const miniprogramWebpackEntry_1 = require("../config/miniprogramWebpackEntry");
const chokidar_1 = __importDefault(require("chokidar"));
const paths_1 = __importDefault(require("../config/paths"));
const chalk_1 = __importDefault(require("chalk"));
exports.devServer = (ignoreInitial, watcherDone) => {
    const watchPath = miniprogramWebpackEntry_1.miniprogramWebpackEntry().entryValue;
    const miniprogramCompiler = new index_1.MiniProgramCompiler();
    return chokidar_1.default.watch(watchPath, {
        cwd: paths_1.default.appCwd,
        ignoreInitial,
        ignored: /(^|[/\\])\../
    })
        .on('ready', miniprogramCompiler.ready(watcherDone))
        .on('add', miniprogramCompiler.add)
        .on('unlink', miniprogramCompiler.remove) // TODO remove empty folders when all containing files deleted
        .on('change', miniprogramCompiler.change)
        .on('error', (err) => {
        console.log(`${chalk_1.default.red('File system watch error:')} ${err}`);
    });
};
