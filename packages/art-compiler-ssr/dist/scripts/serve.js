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
// import clearConsole from 'art-dev-utils/lib/clearConsole';
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const path = __importStar(require("path"));
const paths_1 = __importDefault(require("../config/paths"));
const formatWebpackMessages_1 = __importDefault(require("art-dev-utils/lib/formatWebpackMessages"));
const envName = appConfig_1.default.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig_1.default.get(`devPort:${envName}`);
// const isInteractive = process.stdout.isTTY;
let nodeServerHasLunched = false;
const lunchNodeServer = (modules, port) => {
    if (nodeServerHasLunched) {
        return;
    }
    // if (isInteractive) { clearConsole(); }
    const mockServerPath = path.join(__dirname, '../../../art-server-mock/dist/index.js');
    const nodemonPath = path.join(require.resolve('nodemon'), '../../bin/nodemon.js');
    executeNodeScript_1.default(nodemonPath, '--watch', paths_1.default.appMockServer, '--ignore', paths_1.default.appMockServer, '-e', 'js, jsx, ts', mockServerPath, '--ART_MODULES', `${JSON.stringify(modules)}`, '--ART_WEBPACK_PORT', `${port}`);
    nodeServerHasLunched = true;
};
// let compileMockServerHasLunched = false;
// const compileMockServer = () => {
//   if (compileMockServerHasLunched) { return; }
//   executeNodeScript(
//     process.env.STAGE === 'dev' ?
//     '../../node_modules/.bin/tsc' :
//     path.join(process.cwd(), 'node_modules/.bin/tsc'),
//     '-p', `${paths.appMockServerConfig}`,
//     '-w'
//   );
//   compileMockServerHasLunched = true;
// };
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
        const webpackConfigWeb = config_1.getWebpackConfigWeb();
        const webpackConfigSSR = config_1.getWebpackConfigSSR();
        const webCompiler = createServeCompiler_1.default(webpackConfigWeb, (success) => {
            if (success) {
                console.log('Web Compiler instance created successfully.');
                const artModules = appConfig_1.default.get('ART_MODULES');
                lunchNodeServer(artModules, port);
                // compileMockServer();
            }
        });
        const ssrCompiler = createServeCompiler_1.default(webpackConfigSSR, (success) => {
            if (success) {
                console.log('SSR Compiler instance created successfully.');
            }
        });
        if (webCompiler === null || ssrCompiler === null) {
            return;
        }
        ssrCompiler.watch({
            ignored: /node_modules/,
            aggregateTimeout: 2000
        }, (err, stats) => {
            const messages = formatWebpackMessages_1.default(stats.toJson({}));
            const noErrors = !messages.errors.length;
            if (noErrors) {
                console.log(chalkColors_1.greenText('SSR compiled successfully!'));
            }
            else {
                console.log(chalkColors_1.warningText('Debug server was interrupted, please fix lint error!\nFailed to compile.\n'));
                console.log(messages.errors.join('\n\n'));
                return;
            }
        });
        const proxySetting = appConfig_1.default.get('art:proxy');
        const proxyConfig = prepareProxy_1.default(proxySetting);
        const devServerConfig = webpackDevServer_1.default(proxyConfig, urls.lanUrlForConfig);
        const devServer = new webpack_dev_server_1.default(webCompiler, devServerConfig);
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
