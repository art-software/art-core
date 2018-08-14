"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_bar_webpack_plugin_1 = __importDefault(require("progress-bar-webpack-plugin"));
const chalk_1 = __importDefault(require("chalk"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const paths_1 = __importDefault(require("./paths"));
exports.configBasePlugins = [
    new progress_bar_webpack_plugin_1.default({
        format: chalk_1.default.cyan('build') + ' [:bar] ' + chalk_1.default.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
    }),
    new fork_ts_checker_webpack_plugin_1.default({
        tsconfig: paths_1.default.appTsConfig,
        tslint: paths_1.default.appTsLintConfig
    })
];
