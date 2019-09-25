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
const inquirer_1 = require("../utils/inquirer");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const choosePort_1 = __importDefault(require("art-dev-utils/lib/choosePort"));
const webpackDevServer_1 = __importDefault(require("../config/webpackDevServer"));
const createServeCompiler_1 = __importDefault(require("../utils/createServeCompiler"));
const config_1 = require("../config");
const prepareProxy_1 = __importDefault(require("art-dev-utils/lib/prepareProxy"));
const prepareUrls_1 = __importDefault(require("art-dev-utils/lib/prepareUrls"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const clearConsole_1 = __importDefault(require("art-dev-utils/lib/clearConsole"));
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const path = __importStar(require("path"));
const paths_1 = __importDefault(require("../config/paths"));
const envName = appConfig_1.default.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig_1.default.get(`devPort:${envName}`);
const isInteractive = process.stdout.isTTY;
let nodeServerHasLunched = false;
const lunchNodeServer = (port) => {
    const artModules = appConfig_1.default.get('ART_MODULES');
    if (nodeServerHasLunched) {
        return;
    }
    if (isInteractive) {
        clearConsole_1.default();
    }
    const mockServerPath = path.join(__dirname, '../../../art-server-mock/dist/index.js');
    const nodemonPath = path.join(require.resolve('nodemon'), '../../bin/nodemon.js');
    executeNodeScript_1.default(nodemonPath, '--watch', paths_1.default.appMockServer, '--ignore', paths_1.default.appMockServer, '-e', 'js, jsx, ts', mockServerPath, '--ART_MODULES', `${JSON.stringify(artModules)}`, '--ART_WEBPACK_PORT', `${port}`);
    nodeServerHasLunched = true;
};
let compileMockServerHasLunched = false;
const compileMockServer = () => {
    if (compileMockServerHasLunched) {
        return;
    }
    executeNodeScript_1.default(process.env.STAGE === 'dev' ?
        '../../node_modules/.bin/tsc' :
        path.join(process.cwd(), 'node_modules/.bin/tsc'), '-p', `${paths_1.default.appMockServerConfig}`, '-w');
    compileMockServerHasLunched = true;
};
const confirmModulesCb = (answer) => {
    if (answer.availableModulesOk === false) {
        return;
    }
    choosePort_1.default(HOST, DEFAULT_PORT)
        .then((port) => {
        if (port === null) {
            return;
        }
        // Save new availble webpack dev port.
        appConfig_1.default.set(`devPort:${envName}`, port);
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const urls = prepareUrls_1.default(protocol, HOST, port);
        const webpackconfig = config_1.getWebpackConfig();
        // const allEntries = webpackconfig.reduce((prev, curr) => {
        //   return Object.assign(prev, curr.entry);
        // }, {});
        // console.log('allEntries: ', allEntries);
        const compiler = createServeCompiler_1.default(webpackconfig, (success) => {
            if (success) {
                console.log('Compiler instance created successfully.');
                lunchNodeServer(port);
                compileMockServer();
            }
        });
        if (compiler === null) {
            return;
        }
        const proxySetting = appConfig_1.default.get('art:proxy');
        const proxyConfig = prepareProxy_1.default(proxySetting);
        const devServerConfig = webpackDevServer_1.default(proxyConfig, urls.lanUrlForConfig);
        const devServer = new webpack_dev_server_1.default(compiler, devServerConfig);
        devServer.listen(port, HOST, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log(chalkColors_1.cyanText(`Starting compilers to compiling modules hold on...\n`));
        });
        ['SIGINT', 'SIGTERM'].forEach((sig) => {
            process.on(sig, () => {
                devServer.close();
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
};
inquirer_1.confirmModules(confirmModulesCb);
