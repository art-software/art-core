"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const projectType_1 = require("./projectType");
const ProjectTypes_1 = require("../enums/ProjectTypes");
const CompilerNames_1 = require("../enums/CompilerNames");
const Stage_1 = require("../enums/Stage");
const isDevStage = process.env.STAGE === Stage_1.Stage.dev;
function getWebpackScriptPath(command) {
    const projectType = projectType_1.getProjectType() || ProjectTypes_1.ProjectTypes.SPA;
    const compilerName = CompilerNames_1.CompilerNames[projectType];
    const scriptPath = path.resolve(process.cwd(), `./node_modules/${compilerName}/dist/scripts/${command}.js`);
    const symlinkPath = path.resolve(__dirname, `../../../${compilerName}/dist/scripts/${command}.js`);
    return isDevStage ? symlinkPath : scriptPath;
}
exports.getWebpackScriptPath = getWebpackScriptPath;
