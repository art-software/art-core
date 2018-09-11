"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syncMapping = (scaffoldInstance) => {
    const mapping = [
        {
            name: '.babelrc'
        },
        {
            name: '.eslintrc.json'
        },
        {
            name: '.artignore',
            rename: '.gitignore'
        },
        {
            name: 'tsconfig.json'
        },
        {
            name: 'tsconfig-mock.json'
        },
        {
            name: 'tslint.json'
        },
        {
            name: 'package.json',
            replace: [
                { from: 'art-app', to: scaffoldInstance.projectName },
                { from: 'application based on art frontend development framework', to: scaffoldInstance.projectDescription }
            ]
        },
        {
            name: 'README.md'
        }
    ];
    return mapping;
};
module.exports = syncMapping;
