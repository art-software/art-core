"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const webpack_stream_1 = __importDefault(require("webpack-stream"));
const webpack_1 = __importDefault(require("webpack"));
const env_1 = require("../utils/env");
const paths_1 = __importDefault(require("../config/paths"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
const composeWebpackEntry = (filePath) => {
    console.log('filePath: ', filePath);
    const entry = {};
    const realPath = filePath.split('client')[1];
    entry[`${realPath.replace('.less', '.wxss')}`] = filePath;
    return entry;
};
exports.compileLess = (path, webpackConfig) => {
    const newWebpackConfig = Object.assign({}, webpackConfig, {
        entry: composeWebpackEntry(path)
    });
    // delete (newWebpackConfig.output as any).filename;
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(webpack_stream_1.default(newWebpackConfig, webpack_1.default, () => { }))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .pipe(vinyl_fs_1.default.dest(env_1.isProd() ? paths_1.default.appPublic : paths_1.default.appDebug))
            .on('end', resolve);
    });
};
