"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
exports.compileImage = (path) => {
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(path, vfsHelper_1.getSrcOptions())
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            // TODO do image minifiy within webpack or gulp
            // .pipe(gulpif(
            //     isProd(),
            //     gulpJSONMinify()
            //   )
            // )
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default))
            .on('end', resolve);
    });
};
