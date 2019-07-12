"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.excludeNodeModulesExcept = (...modules) => {
    const pathSep = path_1.sep === '\\' ? '\\\\' : path_1.sep;
    const moduleRegExps = modules.map((moduleName) => {
        return new RegExp('node_modules' + pathSep + moduleName);
    });
    return function (modulePath) {
        if (/node_modules/.test(modulePath)) {
            for (let i = 0; i < moduleRegExps.length; i++) {
                if (moduleRegExps[i].test(modulePath)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
};
