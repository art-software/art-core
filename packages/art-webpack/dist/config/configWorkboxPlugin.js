"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const foreach_1 = __importDefault(require("lodash/foreach"));
const workbox_webpack_plugin_1 = __importDefault(require("workbox-webpack-plugin"));
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const appConfig_1 = __importDefault(require("./appConfig"));
const configWebpackModules_1 = require("./configWebpackModules");
const env_1 = require("../utils/env");
const isProdEnv = env_1.isProd();
const nodeEnv = appConfig_1.default.get('NODE_ENV');
const buildEnv = appConfig_1.default.get('BUILD_ENV');
const enableSW = appConfig_1.default.get('art:sw:enable');
const transformModulesToEntries = (modules) => {
    let transformedEntries;
    if (Array.isArray(modules) && modules.length > 0) {
        const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
        const entryKeys = modules.map((module) => `${projectVirtualPath}/${module}`);
        const entries = configWebpackModules_1.webpackEntries(false);
        const includeEntries = {};
        entryKeys.forEach((entryKey) => {
            includeEntries[entryKey] = entries[entryKey];
        });
        transformedEntries = includeEntries;
    }
    else {
        transformedEntries = configWebpackModules_1.webpackEntries(false);
    }
    return transformedEntries;
};
const configWorkboxWebpackPlugin = () => {
    const plugins = [];
    if (!enableSW) {
        return plugins;
    }
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${nodeEnv}`), false);
    const port = appConfig_1.default.get(`devPort:${nodeEnv}`);
    const output = appConfig_1.default.get('art:webpack:output') || {};
    const publicPath = isProdEnv ? output[`${buildEnv}PublicPath`] : `${host}:${port}/public/`;
    const webpackOutputPath = configWebpackModules_1.webpackOutput().path;
    const artConfigWorkboxOutputDirectory = appConfig_1.default.get('art:sw:workboxOutputDirectory') || '';
    const artConfigWorkboxGenerateSWOptions = appConfig_1.default.get('art:sw:workboxGenerateSWOptions') || {};
    // 只对需要使用service worker的模块生成service worker文件
    const includeModules = appConfig_1.default.get('art:sw:includeModules');
    const newEntries = transformModulesToEntries(includeModules);
    foreach_1.default(newEntries, (value, entryKey) => {
        const importScripts = [];
        const importsDirectory = ensureSlash_1.default(`${entryKey}/${artConfigWorkboxOutputDirectory}`, false);
        plugins.push(new copy_webpack_plugin_1.default([
            {
                from: path_1.default.resolve(process.cwd(), 'client/common/equipments/service-worker/workbox-index.js'),
                to: ensureSlash_1.default(webpackOutputPath, true) + `${importsDirectory}/[name].[hash].[ext]`,
                transform(content, originalPath) {
                    const fileContent = content.toString('utf8');
                    const moduleName = entryKey.slice(entryKey.lastIndexOf('/') + 1);
                    const replacedFileContent = fileContent.replace('<module>', moduleName);
                    const transformedContent = Buffer.from(replacedFileContent, 'utf8');
                    return Promise.resolve(transformedContent);
                },
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
            exclude: [new RegExp(`^(?!.*${entryKey}).*$`), new RegExp(importsDirectory)],
            importsDirectory,
            importScripts,
            importWorkboxFrom: 'disabled',
            skipWaiting: false,
            clientsClaim: true,
            cleanupOutdatedCaches: false,
            navigateFallback: ensureSlash_1.default(publicPath + entryKey, true) + 'index.html'
        }, artConfigWorkboxGenerateSWOptions)));
    });
    return plugins;
};
exports.default = configWorkboxWebpackPlugin;
