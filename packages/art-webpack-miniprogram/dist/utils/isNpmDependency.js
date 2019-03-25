"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNpmDependency = (path) => {
    const regex = /node_modules/g;
    return regex.test(path);
};
