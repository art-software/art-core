"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
exports.ignoreMapping = (scaffoldInstance) => {
    return [
        {
            name: '.artignore',
            rename: '.gitignore'
        }
    ];
};
exports.serverServiceRenderMapping = (scaffoldInstance) => {
    const { moduleName } = scaffoldInstance;
    return [
        {
            name: 'server.ts',
            replace: [
                { from: 'Main', to: getFirstCodeUpper(moduleName) },
                { from: 'main', to: moduleName }
            ]
        }
    ];
};
exports.configServiceRenderMapping = (scaffoldInstance) => {
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
exports.configServiceWebMapping = (scaffoldInstance) => {
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
        ...this.ignoreMapping()
    ];
};
// TODO replace
exports.controllerServiceWebMapping = (scaffoldInstance) => {
    const { moduleName } = scaffoldInstance;
    return [
        {
            name: `./src/controllers/Main/MainController.ts`,
            rename: `./src/controllers/${moduleName}/${getFirstCodeUpper(moduleName)}Controller.ts`,
            replace: [
                { from: 'Main', to: getFirstCodeUpper(moduleName) },
                { from: 'main', to: moduleName }
            ]
        }
    ];
};
exports.servicesServiceWebMapping = (scaffoldInstance) => {
    const { moduleName } = scaffoldInstance;
    return [
        {
            name: `./src/services/aggregator.ts`,
            rename: `./src/services/aggregator.ts`
        },
        {
            name: `./src/services/Main/MainService.ts`,
            rename: `./src/services/${moduleName}/${getFirstCodeUpper(moduleName)}Service.ts`,
            replace: [
                { from: 'Main', to: getFirstCodeUpper(moduleName) },
                { from: 'main', to: moduleName }
            ]
        }
    ];
};
exports.srcServiceWebMapping = (scaffoldInstance) => {
    return [
        {
            name: `./src/index.ts`
        },
        {
            name: `./src/server.ts`
        }
    ];
};
exports.configMapping = (scaffoldInstance) => {
    return [
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
                { from: 'art-ssr-client', to: scaffoldInstance.projectName },
                { from: 'art ssr client', to: scaffoldInstance.projectDescription }
            ]
        },
        {
            name: 'README.md'
        }
    ];
};
exports.clientMapping = (scaffoldInstance) => {
    // const scaffoldType = scaffoldInstance.scaffoldChoosen.replace('react/', '');
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
                name: `./client/main/`,
                rename: `./client/${scaffoldInstance.moduleName}/`
            }
        ] :
        [
            {
                name: `./client/main/`,
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
                { from: /\/main/g, to: `/${scaffoldInstance.moduleName}` }
            ]
        }
    ];
};
const getFirstCodeUpper = (sourceString = '') => {
    if (sourceString) {
        const arr = sourceString.split('');
        const firstUpper = arr[0].toLocaleUpperCase();
        arr.splice(0, 1, firstUpper);
        return arr.join('');
    }
    else {
        return '';
    }
};
