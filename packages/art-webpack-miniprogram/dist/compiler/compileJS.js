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
const composeWebpackEntry = (filePath) => {
    const entry = {};
    const realPath = filePath.split('client')[1];
    entry[`${realPath.replace('.ts', '.js')}`] = filePath;
    return entry;
};
exports.compileJS = (path, webpackConfig) => {
    Object.assign(webpackConfig, {
        entry: composeWebpackEntry(path)
    });
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(path)
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(webpack_stream_1.default(webpackConfig, webpack_1.default, () => { }))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .on('end', resolve);
    });
};
