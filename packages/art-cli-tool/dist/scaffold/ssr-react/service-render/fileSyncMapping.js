"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firstWordUpperCase_1 = require("../../../helpers/firstWordUpperCase");
exports.serverMapping = (scaffoldInstance) => {
    const { moduleName, projectVirtualPath } = scaffoldInstance;
    return [
        {
            name: 'server.ts',
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName },
                { from: 'demo/ssr', to: projectVirtualPath }
            ]
        }
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
        }
    ];
};
