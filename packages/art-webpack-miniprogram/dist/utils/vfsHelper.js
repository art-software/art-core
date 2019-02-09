"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_notify_1 = __importDefault(require("gulp-notify"));
const minimatch_1 = __importDefault(require("minimatch"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const path_1 = require("path");
const env_1 = require("./env");
const paths_1 = __importDefault(require("../config/paths"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
exports.handleErros = (error) => {
    gulp_notify_1.default.onError({
        title: 'Compiler Error',
        subtitle: 'Failure!',
        message: '\nError: <%= error.message %>',
        sound: 'Beep'
    });
};
exports.fileTypeChecker = (type, filePath) => {
    const mimeTypes = {
        image: '**/*.{jpg,jpeg,png,gif,svg}',
        imageNative: '**/*{.native,-native}.{jpg,jpeg,png,gif,svg}',
        xml: '**/*.{xml,html,wxml}',
        json: '**/*.json',
        scripts: '**/*.{ts,js,mjs}',
        less: '**/*.{less,wxss}',
        lessIgnore: '**/*{.ignore,-ignore}.{less,wxss}'
    };
    if (filePath) {
        return minimatch_1.default(filePath, mimeTypes[type]);
    }
    else {
        return mimeTypes[type];
    }
};
exports.getDest = (vfsInstance) => {
    const dest = path_1.join(env_1.isProd() ? paths_1.default.appPublic : paths_1.default.appDebug, projectVirtualPath);
    return vfsInstance.dest(dest, { cwd: paths_1.default.appCwd });
};
