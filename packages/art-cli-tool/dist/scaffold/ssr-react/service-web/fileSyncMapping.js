"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firstWordUpperCase_1 = require("../../../helpers/firstWordUpperCase");
exports.controllerMapping = (scaffoldInstance) => {
    const { moduleName, projectVirtualPath } = scaffoldInstance;
    return [
        {
            name: `./src/controllers/Main/MainController.ts`,
            rename: `./src/controllers/${moduleName}/${firstWordUpperCase_1.firstWordUpperCase(moduleName)}Controller.ts`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName },
                { from: 'demo/ssr', to: projectVirtualPath }
            ]
        }
    ];
};
exports.servicesMapping = (scaffoldInstance) => {
    const { moduleName } = scaffoldInstance;
    return [
        {
            name: `./src/services/Main/MainService.ts`,
            rename: `./src/services/${moduleName}/${firstWordUpperCase_1.firstWordUpperCase(moduleName)}Service.ts`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        }
    ];
};
exports.srcMapping = (scaffoldInstance) => {
    return [
        {
            name: `./src/index.ts`
        },
        {
            name: `./src/server.ts`
        },
        {
            name: `./src/services/aggregator.ts`
        },
    ];
};
exports.configMapping = (scaffoldInstance) => {
    return [
        {
            name: 'tsconfig.json'
        },
        {
            name: 'tslint.json'
        },
        {
            name: 'package.json'
        },
        {
            name: '.artignore',
            rename: '.gitignore'
        }
    ];
};
