"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syncMapping = {
    '.babelrc': {
        operation: 'copy'
    },
    '.eslintrc.json': {
        operation: 'copy'
    },
    '.artignore': {
        operation: 'copy',
        rename: '.gitignore'
    },
    'tsconfig.json': {
        operation: 'copy'
    },
    'tsconfig-mock.json': {
        operation: 'copy'
    },
    'tslint.json': {
        operation: 'copy'
    },
    'package.json': {
        operation: 'transform',
        handler: () => {
        }
    },
    'README.md': {
        operation: 'copy'
    }
};
module.exports = syncMapping;
