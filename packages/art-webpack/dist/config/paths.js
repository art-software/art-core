"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveAppPath_1 = __importDefault(require("art-dev-utils/lib/resolveAppPath"));
const paths = {
    appCwd: resolveAppPath_1.default(''),
    appPublic: resolveAppPath_1.default('public'),
    appPackageJson: resolveAppPath_1.default('package.json'),
    appSrc: resolveAppPath_1.default('client'),
    appServer: resolveAppPath_1.default('server'),
    appNodeModules: resolveAppPath_1.default('node_modules'),
    appArtConfig: resolveAppPath_1.default('art.config.js'),
    appTsConfig: resolveAppPath_1.default('tsconfig.json'),
    appTsLintConfig: resolveAppPath_1.default('tslint.json')
};
exports.default = paths;
