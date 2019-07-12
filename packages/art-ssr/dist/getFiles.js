"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
exports.default = (fullPathStr) => {
    return glob_1.default.sync(path_1.default.join(fullPathStr, '**', '*.js'))
        .map((file) => {
        const name = path_1.default.relative(fullPathStr, file);
        return {
            name,
            path: file
        };
    });
};
