"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createVM_1 = __importDefault(require("./createVM"));
const fs_1 = __importDefault(require("fs"));
const has_1 = __importDefault(require("has"));
exports.default = (files, vmOptions) => {
    const fileEntries = Object.entries(files);
    const vm = createVM_1.default({
        cacheSize: fileEntries.length,
        ...vmOptions
    });
    const resolvedFiles = fileEntries.reduce((components, [fileName, filePath]) => {
        const code = fs_1.default.readFileSync(filePath, 'utf-8');
        try {
            // Load the bundle on startup so we can cache its exports.
            vm.run(filePath, code);
            // Cache the code as well as the path to it.
            components[fileName] = {
                filePath,
                code
            };
        }
        catch (err) {
            // If loading the component failed then we'll skip it.
            console.error(err.stack);
        }
        return components;
    }, {});
    return (name) => {
        if (has_1.default(resolvedFiles, name)) {
            const { filePath, code } = resolvedFiles[name];
            return vm.run(filePath, code);
        }
        return null;
    };
};
