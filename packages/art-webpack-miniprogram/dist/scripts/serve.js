"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const appConfig_1 = __importDefault(require("../config/appConfig"));
const isWellStructuredClient_1 = require("../utils/isWellStructuredClient");
const paths_1 = __importDefault(require("../config/paths"));
const path_1 = require("path");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const choosePort_1 = __importDefault(require("art-dev-utils/lib/choosePort"));
const config_1 = require("../config");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const devServer_1 = require("../compiler/devServer");
const jsonFormat = require('json-format');
const PROJECTJSON = 'project.config.json';
const envName = appConfig_1.default.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig_1.default.get(`devPort:${envName}`);
const PORT = appConfig_1.default.get('PORT');
const clearCacheInquire = () => {
    return inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'clearCache',
            default: false,
            message: `${chalk_1.default.cyan('=>')} Clear local cache ${chalk_1.default.magenta.bold('debug')} ?`
        }
    ]).then((answer) => {
        return {
            clearCache: answer.clearCache
        };
    });
};
isWellStructuredClient_1.isWellStructuredClient();
let nodeServerHasLunched = false;
const lunchNodeServer = (modules, port) => {
    if (nodeServerHasLunched) {
        return;
    }
    const nodemonPath = path_1.join(require.resolve('nodemon'), '../../bin/nodemon.js');
    const mockServerPath = path_1.join(__dirname, './startMockServer.js');
    PORT ?
        executeNodeScript_1.default(nodemonPath, '--watch', paths_1.default.appMockServer, '--ignore', paths_1.default.appMockServer, '-e', 'js, jsx, ts', mockServerPath, '--PORT', PORT) :
        executeNodeScript_1.default(nodemonPath, '--watch', paths_1.default.appMockServer, '--ignore', paths_1.default.appMockServer, '-e', 'js, jsx, ts', mockServerPath);
    nodeServerHasLunched = true;
};
let compileMockServerHasLunched = false;
const compileMockServer = () => {
    if (compileMockServerHasLunched) {
        return;
    }
    executeNodeScript_1.default('../../node_modules/.bin/tsc', '-p', `${paths_1.default.appMockServerConfig}`, '-w');
    compileMockServerHasLunched = true;
};
clearCacheInquire().then((answer) => {
    if (answer.clearCache) {
        const virtualPath = require(paths_1.default.appArtConfig).projectVirtualPath || '';
        const debugOutputDir = path_1.join(paths_1.default.appDebug, virtualPath);
        if (fs_1.existsSync(debugOutputDir)) {
            const debugProjectJSONPath = path_1.join(debugOutputDir, PROJECTJSON);
            let debugProjectConfigJSON;
            if (fs_1.existsSync(debugProjectJSONPath)) {
                debugProjectConfigJSON = fs_extra_1.readJSONSync(debugProjectJSONPath);
            }
            // clear debug files
            fs_extra_1.emptyDirSync(debugOutputDir);
            console.log('cache cleared');
            if (debugProjectConfigJSON) {
                fs_1.writeFileSync(debugProjectJSONPath, jsonFormat(debugProjectConfigJSON, {
                    type: 'space',
                    size: 2
                }));
            }
        }
    }
    choosePort_1.default(HOST, DEFAULT_PORT)
        .then((port) => {
        if (port === null) {
            console.log('no avaliable port found');
            return;
        }
        // Save new availble webpack dev port.
        appConfig_1.default.set(`devPort:${envName}`, port);
        const webpackConfig = config_1.getWebpackConfig();
        const miniprogramDevServer = devServer_1.devServer(webpackConfig, answer.clearCache, () => {
            console.log('watch done........');
        });
        compileMockServer();
        lunchNodeServer('', port);
        ['SIGINT', 'SIGTERM'].forEach((sig) => {
            process.on(sig, () => {
                miniprogramDevServer.close();
                process.exit();
            });
        });
    })
        .catch((error) => {
        if (error && error.message) {
            console.log(error.message);
        }
        process.exit(1);
    });
});
