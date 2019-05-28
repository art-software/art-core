"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const path_1 = require("path");
const paths_1 = __importDefault(require("../config/paths"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const env_1 = require("../utils/env");
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_imagemin_1 = __importDefault(require("gulp-imagemin"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
exports.compileImage = (path) => {
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(gulp_if_1.default(env_1.isProd(), gulp_imagemin_1.default()))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .pipe(vinyl_fs_1.default.dest(path_1.join(paths_1.default.appDebug, projectVirtualPath), { cwd: paths_1.default.appCwd }))
            // .pipe(
            //   vfs.dest(
            //     join(paths.appPublic, projectVirtualPath),
            //     { cwd: paths.appCwd }
            //   )
            // )
            .on('end', resolve);
    });
};
