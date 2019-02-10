"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_bar_webpack_plugin_1 = __importDefault(require("progress-bar-webpack-plugin"));
const chalk_1 = __importDefault(require("chalk"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const paths_1 = __importDefault(require("./paths"));
const happypack_1 = __importDefault(require("happypack"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
exports.configBasePlugins = (() => {
    const plugins = [
        new progress_bar_webpack_plugin_1.default({
            format: chalk_1.default.cyan('build') + ' [:bar] ' + chalk_1.default.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        new mini_css_extract_plugin_1.default({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]',
            chunkFilename: '[id]'
        }),
        new happypack_1.default({
            id: 'js',
            threads: 3,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            ],
        }),
        new happypack_1.default({
            id: 'ts',
            threads: 3,
            loaders: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        silent: false,
                        happyPackMode: true
                    }
                }
            ]
        }),
        new fork_ts_checker_webpack_plugin_1.default({
            tsconfig: paths_1.default.appTsConfig,
            tslint: paths_1.default.appTsLintConfig
        }),
    ];
    return plugins;
})();
