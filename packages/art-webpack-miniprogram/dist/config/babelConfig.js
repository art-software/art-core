"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = __importDefault(require("./paths"));
const path_1 = require("path");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const defaultBabelConfig = {
    presets: ['@babel/preset-env']
};
const babelrcPath = path_1.join(paths_1.default.appCwd, '.babelrc');
const customBabelConfig = fs_1.existsSync(babelrcPath) ?
    fs_extra_1.readJSONSync(path_1.join(paths_1.default.appCwd, '.babelrc')) : {};
exports.babelConfig = Object.assign({}, defaultBabelConfig, customBabelConfig);
