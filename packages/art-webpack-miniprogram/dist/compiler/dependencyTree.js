"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_cruiser_1 = require("dependency-cruiser");
const paths_1 = __importDefault(require("../config/paths"));
const path_1 = require("path");
const isDevStage = process.env.STAGE === 'dev';
exports.dependencyTree = (entry) => {
    if (!entry.length) {
        return [];
    }
    const cruiseResult = dependency_cruiser_1.cruise(entry, {
        outputType: 'json',
        preserveSymlinks: true
    });
    const dependencies = JSON.parse(cruiseResult.modules).modules;
    return dependencies.filter((dependency) => {
        return dependency.coreModule !== true;
    }).map((notCoreDependency) => {
        let depPath = path_1.join(paths_1.default.appCwd, notCoreDependency.source);
        return depPath = isDevStage ? depPath.replace('packages', 'node_modules') : depPath;
    });
};
