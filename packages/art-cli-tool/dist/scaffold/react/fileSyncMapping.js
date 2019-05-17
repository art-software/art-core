"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configMapping = (scaffoldInstance) => {
    return [
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
};
exports.clientMapping = (scaffoldInstance) => {
    const scaffoldType = scaffoldInstance.scaffoldChoosen.replace('react/', '');
    return [
        {
            name: `./client/${scaffoldType}/`,
            rename: `./client/${scaffoldInstance.moduleName}/`
        },
        {
            name: `./client/common/`
        }
    ];
};
exports.serverMapping = (scaffoldInstance) => {
    return [
        {
            name: `./mock/IndexController.ts`,
            rename: `./mock/${scaffoldInstance.moduleName}/IndexController.ts`,
            replace: [
                { from: /\/mock_request/g, to: `/${scaffoldInstance.moduleName}` }
            ]
        }
    ];
};
exports.artConfigMapping = (scaffoldInstance) => {
    return [
        {
            name: `art.config.js`,
            replace: [
                { from: /art\/virtual\/path/g, to: scaffoldInstance.projectVirtualPath },
                { from: /\/h5/g, to: `/${scaffoldInstance.moduleName}` }
            ]
        }
    ];
};
