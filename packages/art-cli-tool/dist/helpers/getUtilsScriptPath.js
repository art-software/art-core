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
const Stage_1 = require("../enums/Stage");
const isDevStage = process.env.STAGE === Stage_1.Stage.dev;
function getUtilsScriptPath(utilName) {
    utilName = replaceSpaceToHump(utilName);
    const scriptPath = path.resolve(process.cwd(), `./node_modules/art-tools/dist/${utilName}`);
    const symlinkPath = path.resolve(process.cwd(), `../art-tools/dist/${utilName}`);
    return isDevStage ? symlinkPath : scriptPath;
}
exports.getUtilsScriptPath = getUtilsScriptPath;
const replaceSpaceToHump = (str) => {
    const reg = new RegExp(`\\\s(\\w)`, 'g');
    return str.replace(reg, (all, letter) => {
        return letter.toUpperCase();
    });
};
