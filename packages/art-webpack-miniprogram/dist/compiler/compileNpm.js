"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyMapping_1 = require("./dependencyMapping");
const fs_1 = require("fs");
const paths_1 = __importDefault(require("../config/paths"));
const vinyl_fs_1 = __importDefault(require("vinyl-fs"));
const path_1 = require("path");
const env_1 = require("../utils/env");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const vfsHelper_1 = require("../utils/vfsHelper");
const webpack_stream_1 = __importDefault(require("webpack-stream"));
const webpack_1 = __importDefault(require("webpack"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
const getAllNpmDependencies = () => {
    const allNpmDependencies = [];
    const npmMapping = dependencyMapping_1.DependencyMapping.getAllMapping();
    npmMapping.forEach((deps) => {
        deps.forEach((dep) => {
            if (allNpmDependencies.includes(dep)) {
                return;
            }
            allNpmDependencies.push(dep);
        });
    });
    return allNpmDependencies;
};
const writeEntryFile = (entryFilePath) => {
    return new Promise((resolve, reject) => {
        fs_1.writeFile(entryFilePath, getAllNpmDependencies().join('\n'), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
const getWebpackDist = () => {
    return path_1.join(env_1.isProd() ? paths_1.default.appPublic : paths_1.default.appDebug, projectVirtualPath, 'lib');
};
exports.compileNpm = (webpackConfig) => __awaiter(this, void 0, void 0, function* () {
    const newWebpackConfig = Object.assign({}, webpackConfig, {
        entry: paths_1.default.appNpmMappings,
        output: {
            filename: 'bundle.js',
            path: getWebpackDist()
        }
    });
    yield writeEntryFile(paths_1.default.appNpmMappings);
    return new Promise((resolve) => {
        vinyl_fs_1.default.src(paths_1.default.appNpmMappings)
            .pipe(gulp_plumber_1.default(vfsHelper_1.handleErros))
            .pipe(webpack_stream_1.default(newWebpackConfig, webpack_1.default, () => { }))
            .pipe(vfsHelper_1.getDest(vinyl_fs_1.default, 'lib'))
            .on('end', resolve);
    });
});
