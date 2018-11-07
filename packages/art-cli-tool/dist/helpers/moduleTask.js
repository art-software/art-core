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
const chalk_1 = __importDefault(require("chalk"));
const isDevStage = process.env.STAGE === 'dev';
function getFinalPath(command) {
    const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
    const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
    return isDevStage ? symlinkPath : scriptPath;
}
exports.moduleTask = (command, args) => {
    const finalPath = getFinalPath(command);
    if (!checkFileExist_1.default([finalPath])) {
        if (command === 'publish') {
            chalk_1.default.black.bold('please make sure art-webpack version is higher than or equal to v0.0.12');
        }
        return;
    }
    const { modules } = args;
    const parsedModules = parseModules_1.default(modules);
    executeNodeScript_1.default('node', finalPath, '--BUILD_ENV', 'inte', '--ART_MODULES', `${JSON.stringify(parsedModules)}`);
};
