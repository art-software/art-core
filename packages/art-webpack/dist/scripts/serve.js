"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("../utils/inquirer");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const choosePort_1 = __importDefault(require("art-dev-utils/lib/choosePort"));
const webpackDevServer_1 = __importDefault(require("../config/webpackDevServer"));
const createCompiler_1 = __importDefault(require("../utils/createCompiler"));
const config_1 = require("../config");
const prepareProxy_1 = __importDefault(require("art-dev-utils/lib/prepareProxy"));
const prepareUrls_1 = __importDefault(require("art-dev-utils/lib/prepareUrls"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const envName = appConfig_1.default.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig_1.default.get(`devPort:${envName}`);
const isInteractive = process.stdout.isTTY;
function confirmModulesCb(answer) {
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
        const compiler = createCompiler_1.default(webpackconfig, (success) => {
            if (success) {
                console.log('done');
            }
            // if (isInteractive) { clearConsole(); }
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
}
inquirer_1.confirmModules(confirmModulesCb);
