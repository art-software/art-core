"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
exports.configMapping = (scaffoldInstance) => {
    return [
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
                { from: 'art-miniprogram', to: scaffoldInstance.projectName },
                { from: 'WeChat miniprogram application based on art frontend development framework', to: scaffoldInstance.projectDescription }
            ]
        },
        {
            name: 'typings'
        },
        {
            name: 'README.md'
        }
    ];
};
exports.clientMapping = (scaffoldInstance) => {
    const scaffoldType = scaffoldInstance.scaffoldChoosen.replace('miniprogram/', '');
    const commonFolderPath = path_1.join(process.cwd(), './client/common');
    let commonFolderExist = false;
    try {
        commonFolderExist = fs_extra_1.default.pathExistsSync(commonFolderPath);
    }
    catch (e) {
        console.log(e);
        throw new Error('fs-extra pathExistsSync error');
    }
    return commonFolderExist ?
        [
            {
                name: `./client/${scaffoldType}/`,
                rename: `./client/${scaffoldInstance.moduleName}/`
            }
        ] :
        [
            {
                name: `./client/${scaffoldType}/`,
                rename: `./client/${scaffoldInstance.moduleName}/`
            },
            {
                name: `./client/common/`
            },
            {
                name: `./client/app.json`
            },
            {
                name: `./client/app.ts`
            },
            {
                name: `./client/project.config.json`
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
                { from: /art\/virtual\/path/g, to: scaffoldInstance.projectVirtualPath }
                // { from: /\/h5/g, to: `/${scaffoldInstance.moduleName}` }
            ]
        }
    ];
};
