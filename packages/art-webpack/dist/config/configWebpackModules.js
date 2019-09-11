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
const appConfig_1 = __importDefault(require("./appConfig"));
const path = __importStar(require("path"));
const minimatch_1 = __importDefault(require("minimatch"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const paths_1 = __importDefault(require("./paths"));
const lodash_1 = require("lodash");
const env_1 = require("../utils/env");
const BuildEnv_1 = require("../enums/BuildEnv");
const envName = appConfig_1.default.get('NODE_ENV');
const isProdEnv = env_1.isProd();
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath') || '';
const getHotDevServerScripts = () => {
    // WEBPACK DEV SERVER PORT
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false);
    const port = appConfig_1.default.get(`devPort:${envName}`);
    return [
        '' +
            'webpack-dev-server/client?' + host + ':' + port + '/',
        'webpack/hot/dev-server'
    ];
};
exports.attachHotDevServerScripts = (entries) => {
    const hotMiddlewareScript = getHotDevServerScripts();
    const newEntries = lodash_1.clone(entries);
    lodash_1.forEach(entries || {}, (value, key) => {
        newEntries[key] = hotMiddlewareScript.concat(newEntries[key]);
    });
    return newEntries;
};
/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 *
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
exports.webpackEntries = (moduleName, keepQuery) => {
    const allModules = appConfig_1.default.get('art:webpack:entry');
    const newEntries = {};
    console.log('moduleName: ', moduleName);
    let modulePattern = path.join(moduleName.replace(/(\*)+$/ig, '').replace(/^client/, ''), '**/*.{js,jsx,ts,tsx}');
    modulePattern = ['./', path.join('client', modulePattern)].join('');
    for (const key in allModules) {
        const matched = minimatch_1.default.match(ensureHasDotExtension(allModules[key]), modulePattern, { matchBase: true });
        if (matched.length) {
            newEntries[keepQuery ? key : key.split('?')[0]] = [path.join(__dirname, './polyfills')].concat(matched);
            return newEntries;
        }
    }
    return newEntries;
};
/**
 * Get webpack `output` element configuration
 */
exports.webpackOutput = (moduleEntry) => {
    const buildEnv = appConfig_1.default.get('BUILD_ENV');
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false);
    const port = appConfig_1.default.get(`devPort:${envName}`);
    const output = appConfig_1.default.get(`art:webpack:output`) || {};
    const publicPath = isProdEnv ? output[`${buildEnv}PublicPath`] : `${host}:${port}/public/`;
    const outRelativePath = buildEnv === BuildEnv_1.BuildEnv.prod ? './public/' : './debug/';
    return {
        filename: `[name]/${bundleFileNamePattern('.js')}`,
        chunkFilename: `${projectVirtualPath}/${moduleEntry}/[id].[chunkhash].js`,
        path: path.resolve(paths_1.default.appCwd, outRelativePath),
        publicPath
    };
};
/**
 * ensure each file path of entry points has specificed file extension
 * .(js|jsx|ts|tsx) if not default is /index.js
 * @param {Array} files entry points
 */
const ensureHasDotExtension = (files) => {
    return files.map((filePath) => {
        if (!path.extname(filePath)) {
            return ['./', path.join(filePath, 'index.js')].join('');
        }
        else {
            return filePath;
        }
    });
};
const bundleFileNamePattern = (suffix = '.js') => {
    const enableBundleHashName = appConfig_1.default.get('art:enableBundleHashName');
    const version = appConfig_1.default.get('art:version');
    if (!isProdEnv) {
        return `bundle${suffix}`;
    }
    if (enableBundleHashName) {
        return `bundle[chunkhash]${suffix}`;
    }
    return `bundle${suffix}?${version}`;
};
