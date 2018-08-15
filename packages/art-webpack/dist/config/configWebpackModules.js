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
const envName = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production';
/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 *
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
exports.webpackEntries = (keepQuery) => {
    let argvModules = JSON.parse(appConfig_1.default.get('ART_MODULES') || '[]');
    const allModules = appConfig_1.default.get('art:webpack:entry');
    if (!argvModules.length) {
        argvModules = ['**'];
    }
    const newEntries = {};
    argvModules.forEach((moduleEntry) => {
        let modulePattern = path.join(moduleEntry.replace(/(\*)+$/ig, '').replace(/^client/, ''), '**/*.{js,jsx,ts,tsx}');
        modulePattern = ['./', path.join('client', modulePattern)].join('');
        for (const key in allModules) {
            const matched = minimatch_1.default.match(ensureHasDotExtension(allModules[key]), modulePattern, { matchBase: true });
            console.log(`matched: ${matched}`);
            if (matched.length) {
                // newEntries[keepQuery ? key : key.split('?')[0]] = ['polyfills'].concat(matched);
                newEntries[keepQuery ? key : key.split('?')[0]] = matched;
            }
        }
    });
    return newEntries;
};
/**
 * Get webpack `output` element configuration
 */
exports.webpackOutput = () => {
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false);
    const port = appConfig_1.default.get(`devPort:${envName}`);
    const output = appConfig_1.default.get(`art:webpack:output`) || {};
    const publicPath = isProd ? output.publicPath : `${host}:${port}/public/`;
    return {
        filename: `[name]/${bundleFileNamePattern('.js')}`,
        chunkFilename: `_chunks/[id].[chunkhash].js`,
        path: path.resolve(paths_1.default.appCwd, './public'),
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
    if (!isProd) {
        return `bundle${suffix}`;
    }
    if (enableBundleHashName) {
        return `bundle[chunkhash]${suffix}`;
    }
    return `bundle${suffix}?${version}`;
};
