"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
function measureFileSizesBeforeBuild(buildFolder) {
    return new Promise((resolve) => {
        recursive_readdir_1.default(buildFolder, (error, files) => {
        });
    });
}
