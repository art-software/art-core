"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const minimatch_1 = __importDefault(require("minimatch"));
const resolveAppPath_1 = __importDefault(require("art-dev-utils/lib/resolveAppPath"));
/**
 * Filtered all entries defined within art.config.js via command `art serve --modules, -m `
 *
 * @param {Boolean} keepQuery the flag indicates if we need to remove query string of entry item
 */
exports.getConfigEntries = (argvModules) => {
    const appConfig = require(resolveAppPath_1.default('art.config.js'));
    const allModules = appConfig.webpack.entry;
    const newEntries = {};
    argvModules.forEach((moduleEntry) => {
        let modulePattern = path.join(moduleEntry.replace(/(\*)+$/ig, '').replace(/^client/, ''), '**/*.{js,jsx,ts,tsx}');
        modulePattern = ['./', path.join('client', modulePattern)].join('');
        for (const key in allModules) {
            const matched = minimatch_1.default.match(ensureHasDotExtension(allModules[key]), modulePattern, { matchBase: true });
            if (matched.length) {
                newEntries[key] = matched;
            }
        }
    });
    return newEntries;
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
