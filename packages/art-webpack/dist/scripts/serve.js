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
const envName = appConfig_1.default.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig_1.default.get(`devPort:${envName}`);
function confirmModulesCb(answer) {
    console.log(`your answer: `, answer);
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
        const webpackconfig = config_1.getWebpackConfig();
        const compiler = createCompiler_1.default(webpackconfig, (success) => {
            if (success) {
                console.log('done');
            }
        });
        if (compiler === null) {
            return;
        }
        webpackDevServer_1.default(compiler, (result) => {
            console.log(`success, ${result}`);
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
