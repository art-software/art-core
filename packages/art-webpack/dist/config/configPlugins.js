"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const progress_bar_webpack_plugin_1 = __importDefault(require("progress-bar-webpack-plugin"));
const chalk_1 = __importDefault(require("chalk"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const paths_1 = __importDefault(require("./paths"));
const appConfig_1 = __importDefault(require("./appConfig"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const qs_1 = __importDefault(require("qs"));
const forEach_1 = __importDefault(require("lodash/forEach"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const HtmlWebpackCDNPlugin_1 = __importDefault(require("../plugins/HtmlWebpackCDNPlugin"));
const happypack_1 = __importDefault(require("happypack"));
const env_1 = require("../utils/env");
const HtmlWebpackChunksPlugin_1 = require("../plugins/HtmlWebpackChunksPlugin");
const isProdEnv = env_1.isProd();
const configHtmlWebpackPlugin = (entries) => {
    console.log('entries: ', entries);
    const plugins = [];
    const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath') || '';
    const buildEnv = appConfig_1.default.get('BUILD_ENV');
    const assetsProdPublicPath = appConfig_1.default.get(`art:webpack:output:${buildEnv}PublicPath`) || '';
    console.log(`assetsProdPublicPath: ${assetsProdPublicPath}`);
    forEach_1.default(entries, (value, key) => {
        const fragment = key.split('?');
        const entryKey = fragment[0];
        const queryKey = fragment[1];
        const queryObj = qs_1.default.parse(queryKey);
        const myTemplate = path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''), 'index.template.ejs');
        if (!fs.existsSync(myTemplate)) {
            throw new Error(chalk_1.default.red.bold('Sorry, it\'s a breaking change from art-webpack@0.0.22' +
                ' no default template file provided any more, please put template file within module root folder.'));
        }
        const htmlWebpackPluginOptions = {
            chunks: [entryKey],
            minify: isProdEnv ? {
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true
            } : false,
            template: myTemplate,
            filename: `${entryKey}/${queryObj.template || 'index.html'}`,
            // customized template variables
            buildEnv,
            title: queryObj.title || '',
            publicPath: assetsProdPublicPath,
            cdnPath: (queryObj.cdn === '0' || queryObj.cdn === 'false' || !isProdEnv) ? '' : assetsProdPublicPath
        };
        plugins.push(new html_webpack_plugin_1.default(htmlWebpackPluginOptions));
        plugins.push(new HtmlWebpackChunksPlugin_1.HtmlWebpackChunksPlugin({
            manifestPath: path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''))
        }));
    });
    plugins.push(new HtmlWebpackCDNPlugin_1.default());
    return plugins;
};
exports.configBasePlugins = (entries) => {
    let plugins = [
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
    if (isProdEnv) {
        plugins = plugins.concat(configHtmlWebpackPlugin(entries));
    }
    return plugins;
};
