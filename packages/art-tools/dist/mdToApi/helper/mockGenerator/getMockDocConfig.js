"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fileHelper_1 = require("art-dev-utils/lib/fileHelper");
exports.getModuleDocToMockConfig = (folderPath) => {
    const docConfig = [];
    fileHelper_1.walk(folderPath).forEach((file) => {
        if (path_1.default.extname(file) === '.md') {
            const entry = path_1.default.relative(process.cwd(), file);
            const fileConfig = {
                entry,
                output: exports.getOutputMockPath(entry)
            };
            docConfig.push(fileConfig);
        }
    });
    return docConfig;
};
exports.getOutputMockPath = (entryPath) => {
    let outputPath = entryPath.replace('client', 'mock');
    outputPath = outputPath.replace('/services/api-docs', '');
    outputPath = outputPath.replace('.md', 'Controller.ts');
    return outputPath;
};
