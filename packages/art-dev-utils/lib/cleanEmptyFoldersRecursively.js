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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importStar(require("path"));
const chalk_1 = __importDefault(require("chalk"));
function cleanEmptyFoldersRecursively(folderPath) {
    const isDir = fs_1.default.statSync(folderPath).isDirectory();
    if (!isDir) {
        return;
    }
    let files = fs_1.default.readdirSync(folderPath);
    if (files.length > 0) {
        files.forEach((file) => {
            const fullPath = path_1.default.join(folderPath, file);
            cleanEmptyFoldersRecursively(fullPath);
        });
        // re-evaluate files; after deleting subfolder
        // we may have parent folder empty now
        files = fs_1.default.readdirSync(folderPath);
    }
    if (files.length === 0) {
        fs_1.default.rmdirSync(folderPath);
        console.log(`${chalk_1.default.blue('=>')} Empty folder: ${path_1.relative(process.cwd(), folderPath)} has been ${chalk_1.default.yellow('removed')}`);
        return;
    }
}
exports.cleanEmptyFoldersRecursively = cleanEmptyFoldersRecursively;
