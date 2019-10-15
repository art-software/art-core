"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const firstWordUpperCase_1 = require("../../../helpers/firstWordUpperCase");
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
exports.clientMapping = (scaffoldInstance) => {
    // const scaffoldType = scaffoldInstance.scaffoldChoosen.replace('react/', '');
    const { moduleName } = scaffoldInstance;
    const commonFolderPath = path_1.join(process.cwd(), './client/common');
    let commonFolderExist = false;
    try {
        commonFolderExist = fs_extra_1.default.pathExistsSync(commonFolderPath);
    }
    catch (e) {
        console.log(e);
        throw new Error('fs-extra pathExistsSync error');
    }
    const clientList = [
        {
            name: `./client/main/ssr.tsx`,
            rename: `./client/${moduleName}/ssr.tsx`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        },
        {
            name: `./client/main/routes.tsx`,
            rename: `./client/${moduleName}/routes.tsx`
        },
        {
            name: `./client/main/index.tsx`,
            rename: `./client/${moduleName}/index.tsx`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        },
        {
            name: `./client/main/views/home.tsx`,
            rename: `./client/${moduleName}/views/home.tsx`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        },
        {
            name: `./client/main/views/Product.tsx`,
            rename: `./client/${moduleName}/views/Product.tsx`
        },
        {
            name: `./client/main/styles/`,
            rename: `./client/${moduleName}/styles/`
        },
        {
            name: `./client/main/store/store.ts`,
            rename: `./client/${moduleName}/store/store.ts`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        },
        {
            name: `./client/main/services/MainService.ts`,
            rename: `./client/${moduleName}/services/${firstWordUpperCase_1.firstWordUpperCase(moduleName)}Service.ts`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        },
        {
            name: `./client/main/services/interfaces/IMainService.ts`,
            rename: `./client/${moduleName}/services/interfaces/I${firstWordUpperCase_1.firstWordUpperCase(moduleName)}Service.ts`,
            replace: [
                { from: 'Main', to: firstWordUpperCase_1.firstWordUpperCase(moduleName) },
                { from: 'main', to: moduleName }
            ]
        },
        {
            name: `./client/main/reducer/`,
            rename: `./client/${moduleName}/reducer/`
        },
        {
            name: `./client/main/assets/`,
            rename: `./client/${moduleName}/assets/`
        },
    ];
    return commonFolderExist ?
        clientList :
        [
            ...clientList,
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
