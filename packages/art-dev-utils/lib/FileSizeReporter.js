"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recursive_readdir_1 = __importDefault(require("recursive-readdir"));
const gzip_size_1 = require("gzip-size");
const fs_1 = require("fs");
function removeFileNameHash(buildFolder, fileName) {
    return fileName
        .replace(buildFolder, '')
        .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}
function measureFileSizesBeforeBuild(buildFolder) {
    return new Promise((resolve) => {
        recursive_readdir_1.default(buildFolder, (error, files) => {
            let size;
            if (!error && files.length) {
                size = files.filter((file) => /\.(js|css)$/.test(file))
                    .reduce((prev, file) => {
                    const contents = fs_1.readFileSync(file);
                    const key = removeFileNameHash(buildFolder, file);
                    prev[key] = gzip_size_1.sync(contents);
                    return prev;
                }, {});
            }
            resolve({
                root: buildFolder,
                size: size || {}
            });
        });
    });
}
exports.measureFileSizesBeforeBuild = measureFileSizesBeforeBuild;
