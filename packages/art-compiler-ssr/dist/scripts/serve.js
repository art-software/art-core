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
const prepareProxy_1 = __importDefault(require("art-dev-utils/lib/prepareProxy"));
const prepareUrls_1 = __importDefault(require("art-dev-utils/lib/prepareUrls"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
// import clearConsole from 'art-dev-utils/lib/clearConsole';
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const path = __importStar(require("path"));
const paths_1 = __importDefault(require("../config/paths"));
const webpack_config_web_1 = __importDefault(require("../config/webpack.config.web"));
const webpack_1 = __importDefault(require("webpack"));
const resolve_bin_1 = __importDefault(require("resolve-bin"));
const envName = appConfig_1.default.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig_1.default.get(`devPort:${envName}`);
// const isInteractive = process.stdout.isTTY;
let nodeServerHasLunched = false;
const lunchNodeServer = (modules, port) => {
    if (nodeServerHasLunched) {
        return;
    }
    const nodemonPath = path.join(require.resolve('nodemon'), '../../bin/nodemon.js');
    const mockServerPath = path.join(__dirname, './startMockServer.js');
    executeNodeScript_1.default(nodemonPath, '--watch', paths_1.default.appMockServer, '--ignore', paths_1.default.appMockServer, '-e', 'js, jsx, ts', mockServerPath);
    nodeServerHasLunched = true;
};
let compileMockServerHasLunched = false;
const compileMockServer = () => {
    if (compileMockServerHasLunched) {
        return;
    }
    const tsc = resolve_bin_1.default.sync('typescript', { executable: 'tsc' });
    executeNodeScript_1.default(tsc, '-p', `${paths_1.default.appMockServerConfig}`, '-w');
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
        const argvModules = appConfig_1.default.get('ART_MODULES') || '[]';
        const parallelWebpack = path.join(require.resolve('parallel-webpack'), '../bin/run.js');
        const configPathSSR = path.join(__dirname, '../config/webpack.config.ssr.js');
        executeNodeScript_1.default(parallelWebpack, '--config', configPathSSR, '--watch', '--', '--ART_MODULES', `${argvModules}`, '--NODE_ENV', `${envName}`, '--DEV_PORT', `${port}`);
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const urls = prepareUrls_1.default(protocol, HOST, port);
        const proxySetting = appConfig_1.default.get('art:proxy');
        const proxyConfig = prepareProxy_1.default(proxySetting);
        const devServerConfig = webpackDevServer_1.default(proxyConfig, urls.lanUrlForConfig);
        const compiler = webpack_1.default(webpack_config_web_1.default());
        const devServer = new webpack_dev_server_1.default(compiler, devServerConfig);
        devServer.listen(port, HOST, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log(chalkColors_1.cyanText(`Starting compilers to compiling modules hold on...\n`));
        });
        compileMockServer();
        // TODO use pure api mock server
        lunchNodeServer(argvModules, port);
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
