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
const configWebpackModules_1 = require("./configWebpackModules");
const appConfig_1 = __importDefault(require("./appConfig"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const qs_1 = __importDefault(require("qs"));
const foreach_1 = __importDefault(require("lodash/foreach"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const HtmlWebpackCDNPlugin_1 = __importDefault(require("../plugins/HtmlWebpackCDNPlugin"));
const happypack_1 = __importDefault(require("happypack"));
const env_1 = require("../utils/env");
const DynamicChunkNamePlugin_1 = __importDefault(require("../plugins/DynamicChunkNamePlugin"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const workbox_webpack_plugin_1 = __importDefault(require("workbox-webpack-plugin"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const enableSW = appConfig_1.default.get('art:sw:enable');
const envName = appConfig_1.default.get('NODE_ENV');
const isProdEnv = env_1.isProd();
const configHtmlWebpackPlugin = (entries) => {
    const plugins = [];
    const newEntries = entries || configWebpackModules_1.webpackEntries(false);
    const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath') || '';
    const buildEnv = appConfig_1.default.get('BUILD_ENV');
    console.log(`art:webpack:output:${buildEnv}PublicPath`);
    const assetsProdPublicPath = appConfig_1.default.get(`art:webpack:output:${buildEnv}PublicPath`) || '';
    console.log(`assetsProdPublicPath: ${assetsProdPublicPath}`);
    foreach_1.default(newEntries, (value, key) => {
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
    });
    plugins.push(new HtmlWebpackCDNPlugin_1.default());
    return plugins;
};
const configWorkboxWebpackPlugin = () => {
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false);
    const port = appConfig_1.default.get(`devPort:${envName}`);
    const output = appConfig_1.default.get(`art:webpack:output`) || {};
    const publicPath = isProdEnv ? output[`${appConfig_1.default.get('BUILD_ENV')}PublicPath`] : `${host}:${port}/public/`;
    const webpackOutputPath = configWebpackModules_1.webpackOutput().path;
    const artConfigWorkboxGenerateSWOptions = appConfig_1.default.get('art:sw:workboxGenerateSWOptions') || {};
    const plugins = [];
    const newEntries = configWebpackModules_1.webpackEntries(false);
    foreach_1.default(newEntries, (value, entryKey) => {
        const importScripts = [];
        plugins.push(new copy_webpack_plugin_1.default([
            {
                from: path.resolve(process.cwd(), './service-worker/workbox-index.js'),
                to: ensureSlash_1.default(webpackOutputPath, true) + `${entryKey}/[name].[hash].[ext]`,
                transformPath(targetPath, absolutePath) {
                    importScripts.push(publicPath + targetPath);
                    return Promise.resolve(targetPath);
                }
            }
        ]), 
        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        new workbox_webpack_plugin_1.default.GenerateSW(Object.assign({}, {
            swDest: `${entryKey}/service-worker.js`,
            exclude: [new RegExp(`^(?!.*${entryKey}).*$`)],
            importsDirectory: entryKey,
            importWorkboxFrom: 'disabled',
            importScripts,
            skipWaiting: true,
            clientsClaim: true,
            navigateFallback: ensureSlash_1.default(publicPath + entryKey, true) + 'index.html'
        }, artConfigWorkboxGenerateSWOptions)));
    });
    return plugins;
};
const getRawModuleEntry = (entries) => {
    for (const key in entries) {
        entries[key] = entries[key].slice(1);
    }
    return entries;
};
exports.configBasePlugins = (() => {
    let plugins = [
        new progress_bar_webpack_plugin_1.default({
            format: chalk_1.default.cyan('build') + ' [:bar] ' + chalk_1.default.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        // new MiniCssExtractPlugin({
        //   chunkFilename: '[id].[chunkhash].css'
        // }),
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
        }),
        new DynamicChunkNamePlugin_1.default(getRawModuleEntry(configWebpackModules_1.webpackEntries(false)))
    ];
    if (isProdEnv) {
        plugins = plugins.concat(configHtmlWebpackPlugin());
        if (enableSW) {
            plugins = plugins.concat(configWorkboxWebpackPlugin());
        }
    }
    return plugins;
})();
