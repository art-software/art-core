"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const chalkColors_1 = require("./chalkColors");
const checkFileExist = (filePaths) => {
    let currentFilePath = '';
    try {
        filePaths.forEach((filePath) => {
            currentFilePath = filePath;
            fs.accessSync(filePath, fs.constants.F_OK);
        });
        return true;
    }
    catch (error) {
        const dirName = path.dirname(currentFilePath);
        const fileName = path.basename(currentFilePath);
        console.log();
        console.log(chalkColors_1.warningText('Could not find a required file.'));
        console.log(chalkColors_1.warningText('➩ Name: ') + chalkColors_1.cyanBoldText(fileName));
        console.log(chalkColors_1.warningText('➩ Searched in: ') + chalkColors_1.cyanBoldText(dirName));
        console.log(`Full path: ${chalkColors_1.cyanText(currentFilePath)}`);
        return false;
    }
};
exports.default = checkFileExist;
