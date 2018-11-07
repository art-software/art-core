"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const inquirer_1 = __importDefault(require("inquirer"));
const isDevStage = process.env.STAGE === 'dev';
function getFinalPath(command) {
    const scriptPath = path.resolve(process.cwd(), `./node_modules/art-webpack/dist/scripts/${command}.js`);
    const symlinkPath = path.resolve(process.cwd(), `../../node_modules/art-webpack/dist/scripts/${command}.js`);
    return isDevStage ? symlinkPath : scriptPath;
}
exports.webpackTask = (command, args) => __awaiter(this, void 0, void 0, function* () {
    const finalPath = getFinalPath(command);
    if (!checkFileExist_1.default([finalPath])) {
        return;
    }
    const nodeEnv = command === 'serve' ? 'development' : 'production';
    const { modules } = args;
    const parsedModules = parseModules_1.default(modules);
    let buildEnv = 'integrate testing';
    if (command === 'build') {
        const envAnswer = yield inquirer_1.default.prompt({
            type: 'list',
            name: 'buildEnv',
            message: 'please chioce one environment to build',
            choices: ['Integrate Testing', 'Production']
        });
        buildEnv = envAnswer.buildEnv;
    }
    console.log(`buildEnv: ${buildEnv}`);
    executeNodeScript_1.default('node', finalPath, '--NODE_ENV', nodeEnv, '--BUILD_ENV', buildEnv === 'Production' ? 'prod' : 'inte', '--ART_MODULES', `${JSON.stringify(parsedModules)}`);
});
exports.webpackDll = () => {
    const dllScript = getFinalPath('dll');
    executeNodeScript_1.default('node', dllScript);
};
