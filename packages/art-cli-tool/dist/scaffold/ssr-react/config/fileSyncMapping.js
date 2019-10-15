"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreMapping = (scaffoldInstance) => {
    return [
        {
            name: '.artignore',
            rename: '.gitignore'
        }
    ];
};
