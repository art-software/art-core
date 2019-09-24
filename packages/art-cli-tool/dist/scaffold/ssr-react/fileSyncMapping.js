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
    return [
        {
            name: 'server.ts'
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
// const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('');
exports.controllerServiceWebMapping = (scaffoldInstance) => {
    return [
        {
            name: `./src/controllers/MainController.ts`,
            // rename: `./src/controllers/${scaffoldInstance.moduleName}Controller.ts/`
            rename: `./src/controllers/${scaffoldInstance.moduleName}/MainController.ts`
        }
    ];
};
exports.databaseServiceWebMapping = (scaffoldInstance) => {
    return [
        {
            name: `./src/database/redis.ts`,
            // rename: `./src/controllers/${scaffoldInstance.moduleName}Controller.ts/`
            rename: `./src/database/redis.ts`
        }
    ];
};
exports.servicesServiceWebMapping = (scaffoldInstance) => {
    return [
        {
            name: `./src/services/aggregator.ts`,
            rename: `./src/services/aggregator.ts`
        },
        {
            name: `./src/services/MainService.ts`,
            rename: `./src/services/${scaffoldInstance.moduleName}/MainService.ts`
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
                name: `./client/ssr/`,
                rename: `./client/${scaffoldInstance.moduleName}/`
            }
        ] :
        [
            {
                name: `./client/ssr/`,
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
