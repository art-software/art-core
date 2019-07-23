"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_bar_webpack_plugin_1 = __importDefault(require("progress-bar-webpack-plugin"));
const chalk_1 = __importDefault(require("chalk"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const paths_1 = __importDefault(require("./paths"));
// import appConfig from './appConfig';
// import * as path from 'path';
// import * as fs from 'fs';
// import qs from 'qs';
// import foreach from 'lodash/foreach';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlWebpackCDNPlugin from '../plugins/HtmlWebpackCDNPlugin';
const happypack_1 = __importDefault(require("happypack"));
const env_1 = require("../utils/env");
// import { HtmlWebpackChunksPlugin } from '../plugins/HtmlWebpackChunksPlugin';
const isProdEnv = env_1.isProd();
// const configHtmlWebpackPlugin = (entry: any): any[] => {
//   const plugins: any[] = [];
//   const projectVirtualPath = appConfig.get('art:projectVirtualPath') || '';
//   const buildEnv = appConfig.get('BUILD_ENV');
//   console.log(`art:webpack:output:${buildEnv}PublicPath`);
//   const assetsProdPublicPath = appConfig.get(`art:webpack:output:${buildEnv}PublicPath`) || '';
//   console.log(`assetsProdPublicPath: ${assetsProdPublicPath}`);
//   foreach(entry, (value, key) => {
//     const fragment = key.split('?');
//     const entryKey = fragment[0];
//     const queryKey = fragment[1];
//     const queryObj = qs.parse(queryKey);
//     const myTemplate = path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''), 'index.template.ejs');
//     if (!fs.existsSync(myTemplate)) {
//       throw new Error(chalk.red.bold('Sorry, it\'s a breaking change from art-webpack@0.0.22' +
//         ' no default template file provided any more, please put template file within module root folder.'));
//     }
//     const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
//       chunks: [entryKey],
//       minify: isProdEnv ? {
//         minifyJS: true,
//         removeComments: true,
//         collapseWhitespace: true,
//         collapseBooleanAttributes: true
//       } : false,
//       template: myTemplate,
//       filename: `${entryKey}/${queryObj.template || 'index.html'}`,
//       // customized template variables
//       buildEnv,
//       title: queryObj.title || '',
//       publicPath: assetsProdPublicPath,
//       cdnPath: (queryObj.cdn === '0' || queryObj.cdn === 'false' || !isProdEnv) ? '' : assetsProdPublicPath
//     };
//     plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));
//     plugins.push(new HtmlWebpackChunksPlugin({
//       manifestPath: path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''))
//     }));
//   });
//   plugins.push(new HtmlWebpackCDNPlugin());
//   return plugins;
// };
exports.getConfigPluginsWeb = () => {
    const plugins = [
        new progress_bar_webpack_plugin_1.default({
            format: chalk_1.default.cyan('build') + ' [:bar] ' + chalk_1.default.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        new happypack_1.default({
            id: 'jsx',
            threads: 3,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
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
        })
    ];
    // if (isProdEnv) {
    //   plugins = plugins.concat(configHtmlWebpackPlugin(entry));
    // }
    return plugins;
};
