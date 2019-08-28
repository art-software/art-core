"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const devServer_1 = require("../compiler/devServer");
const jsonFormat = require('json-format');
const fs = __importStar(require("fs"));
const PROJECTJSON = 'project.config.json';
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
const lunchNodeServer = () => {
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
    executeNodeScript_1.default(process.env.STAGE === 'dev' ?
        '../../node_modules/.bin/tsc' :
        path_1.join(process.cwd(), 'node_modules/.bin/tsc'), '-p', `${paths_1.default.appMockServerConfig}`, '-w');
    compileMockServerHasLunched = true;
};
const clearCacheAction = (clearCacheStatus, debugOutputDir) => {
    if (clearCacheStatus) {
        // const virtualPath = require(paths.appArtConfig).projectVirtualPath || '';
        // const debugOutputDir = join(paths.appDebug, virtualPath);
        fs_1.existsSync(debugOutputDir);
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
    const miniprogramDevServer = devServer_1.devServer(!clearCacheStatus, () => {
        compileMockServer();
        lunchNodeServer();
        console.log('Initial compilation complete, watching for changes........');
    });
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, () => {
            miniprogramDevServer.close();
            process.exit();
        });
    });
};
const startProjectServe = () => {
    // judge is first serve
    const virtualPath = require(paths_1.default.appArtConfig).projectVirtualPath || '';
    const debugOutputDir = path_1.join(paths_1.default.appDebug, virtualPath);
    const isFirstServe = !fs.existsSync(debugOutputDir);
    if (isFirstServe) {
        console.log(chalk_1.default.green(`\nThis is your first start serve, it will compile your files\n`));
        clearCacheAction(true, debugOutputDir);
        return;
    }
    clearCacheInquire().then((answer) => {
        clearCacheAction(answer.clearCache, debugOutputDir);
    });
};
startProjectServe();
