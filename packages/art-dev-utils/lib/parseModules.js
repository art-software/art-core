"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseModules = (modules) => {
    if (!modules) {
        return [];
    }
    const parsedModules = modules.split(/\s+|,/).filter((m) => {
        if (typeof m === 'string') {
            return true;
        }
    });
    return parsedModules;
};
exports.default = parseModules;
