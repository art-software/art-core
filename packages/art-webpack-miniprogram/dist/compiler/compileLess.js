"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const gulp_less_1 = __importDefault(require("gulp-less"));
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const gulp_clean_css_1 = __importDefault(require("gulp-clean-css"));
const gulp_if_1 = __importDefault(require("gulp-if"));
const env_1 = require("../utils/env");
const chalk_1 = __importDefault(require("chalk"));
exports.compileLess = (path) => {
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(gulp_less_1.default())
            .pipe(gulp_rename_1.default({ extname: '.wxss' }))
            .pipe(gulp_if_1.default(env_1.isProd(), gulp_clean_css_1.default({}, (details) => {
            console.log(`${chalk_1.default.blue('=>')} ${chalk_1.default.green('originalSize:')} ${details.name}: ${details.stats.originalSize}`);
            console.log(`${chalk_1.default.blue('=>')} ${chalk_1.default.green('minifiedSize:')} ${details.name}: ${details.stats.minifiedSize}`);
        })))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .on('end', resolve);
    });
};
