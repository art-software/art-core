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
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const path = __importStar(require("path"));
const paths_1 = __importDefault(require("../config/paths"));
// import { run } from 'parallel-webpack';
const webpackConfigSSR = require.resolve('../config/webpack.config.ssr');
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
        let argvModules = JSON.parse(appConfig_1.default.get('ART_MODULES') || '[]');
        if (typeof argvModules === 'string') {
            argvModules = JSON.parse(argvModules);
        }
        // const webpackConfigWeb = argvModules.map((moduleEntry) => {
        //   const webpackConfig = getWebpackConfigWeb(moduleEntry);
        //   // console.log('webpackConfig: ', webpackConfig);
        //   const webCompiler = createServeCompiler(webpackConfig, (success) => {
        //     if (success) {
        //       console.log('Web Compiler instance created successfully.');
        //       const artModules = appConfig.get('ART_MODULES');
        //       lunchNodeServer(artModules, port);
        //       // compileMockServer();
        //     }
        //   });
        //   if (webCompiler === null) { return; }
        //   return webCompiler;
        // }).filter((instance) => { return instance !== undefined; });
        // console.log('webpackConfigWeb: ', webpackConfigWeb);
        // ssrCompiler.watch({
        //   ignored: /node_modules/,
        //   aggregateTimeout: 2000
        // }, (err, stats) => {
        //   const messages = formatWebpackMessages(stats.toJson({}));
        //   const noErrors = !messages.errors.length;
        //   if (noErrors) {
        //     console.log(greenText('SSR compiled successfully!'));
        //   } else {
        //     console.log(warningText('Debug server was interrupted, please fix lint error!\nFailed to compile.\n'));
        //     console.log(messages.errors.join('\n\n'));
        //     return;
        //   }
        // });
        // const webpackConfigSSR = argvModules.map((moduleEntry) => {
        //   const webpackConfig = getWebpackConfigSSR(moduleEntry);
        //   const ssrCompiler = createServeCompiler(webpackConfig, (success) => {
        //     if (success) {
        //       console.log('SSR Compiler instance created successfully.');
        //     }
        //   });
        //   if (ssrCompiler === null) { return; }
        //   return ssrCompiler;
        // }).filter((instance) => { return instance !== undefined; });
        // console.log('webpackConfigSSR: ', webpackConfigSSR);
        const parallelWebpack = path.join(require.resolve('parallel-webpack'), '../bin/run.js');
        const configPath = path.join(__dirname, '../config/webpack.config.ssr.js');
        executeNodeScript_1.default(parallelWebpack, '--config', configPath, '--watch', '--', '--ART_MODULES', `${JSON.stringify(argvModules)}`);
        // try {
        //   run(webpackConfigSSR, {
        //     watch: true,
        //     maxRetries: 1,
        //   }, (err, stats) => {
        //     const messages = formatWebpackMessages(stats.toJson({}));
        //     const noErrors = !messages.errors.length;
        //     if (noErrors) {
        //       console.log(greenText('SSR compiled successfully!'));
        //     } else {
        //       console.log(warningText('Debug server was interrupted, please fix lint error!\nFailed to compile.\n'));
        //       console.log(messages.errors.join('\n\n'));
        //       return;
        //     }
        //   });
        // } catch (err) {
        //   console.log('errrrr: ', err);
        // }
        // const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        // const urls = prepareUrls(protocol, HOST, port);
        // const proxySetting = appConfig.get('art:proxy');
        // const proxyConfig = prepareProxy(proxySetting);
        // const devServerConfig = webpackDevServeConfig(proxyConfig, urls.lanUrlForConfig);
        // console.log('devServerConfig: ', devServerConfig);
        // const devServer = new WebpackDevServer(webpackConfigWeb, devServerConfig);
        // console.log('devServer: ', devServer);
        // devServer.listen(port, HOST, (error) => {
        //   if (error) {
        //     return console.log(error);
        //   }
        //   console.log(cyanText(`Starting compilers to compiling modules hold on...\n`));
        // });
        // ['SIGINT', 'SIGTERM'].forEach((sig) => {
        //   process.on(sig as NodeJS.Signals, () => {
        //     devServer.close();
        //     process.exit();
        //   });
        // });
    })
        .catch((error) => {
        if (error && error.message) {
            console.log(error.message);
        }
        process.exit(1);
    });
};
inquirer_1.confirmModules(confirmModulesCb);
