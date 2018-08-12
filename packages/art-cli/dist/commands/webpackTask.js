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
const checkFileExist_1 = __importDefault(require("art-dev-utils/lib/checkFileExist"));
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const parseModules_1 = __importDefault(require("art-dev-utils/lib/parseModules"));
exports.webpackTask = (command, args) => {
    const isDevStage = process.env.STAGE === 'dev';
    console.log('isDevStage: ', isDevStage);
    const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
    const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
    const finalPath = isDevStage ? symlinkPath : scriptPath;
    if (!checkFileExist_1.default([finalPath])) {
        return;
    }
    const nodeEnv = command === 'build' ? 'production' : 'development';
    const { modules } = args;
    const parsedModules = parseModules_1.default(modules);
    executeNodeScript_1.default('node', finalPath, '--NODE_ENV', nodeEnv, '--ART_MODULES', `${JSON.stringify(parsedModules)}`);
};
