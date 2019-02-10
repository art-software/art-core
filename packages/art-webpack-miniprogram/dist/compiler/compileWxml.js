"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const gulp_if_1 = __importDefault(require("gulp-if"));
const env_1 = require("../utils/env");
const gulp_htmlmin_1 = __importDefault(require("gulp-htmlmin"));
const htmlminOptions = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    caseSensitive: true,
    collapseBooleanAttributes: false
};
exports.compileWxml = (path) => {
    return new Promise((resolve) => {
        console.log('wxml path: ', path);
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(gulp_if_1.default(env_1.isProd(), gulp_htmlmin_1.default(htmlminOptions)))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .on('end', resolve);
    });
};
