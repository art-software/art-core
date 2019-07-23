"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = __importDefault(require("./Module"));
function load(file, parent) {
    if (!file) {
        return parent;
    }
    const module = new Module_1.default(file, parent);
    module.load(file);
    module.run(file);
    return module;
}
function resolve(require, name) {
    try {
        return require.resolve(name);
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            return null;
        }
        throw e;
    }
}
const loadModules = (require, files) => {
    return () => {
        return files.reduce((module, file) => {
            return load(resolve(require, file), module);
        }, null);
    };
};
exports.default = loadModules;
