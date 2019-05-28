"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const routing_controllers_1 = require("routing-controllers");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const fs = __importStar(require("fs"));
const compression_1 = __importDefault(require("compression"));
const choosePort_1 = __importDefault(require("art-dev-utils/lib/choosePort"));
const printInstructionsMiniprogram_1 = __importDefault(require("art-dev-utils/lib/printInstructionsMiniprogram"));
const prepareUrls_1 = __importDefault(require("art-dev-utils/lib/prepareUrls"));
const artConfigPath = path_1.join(process.cwd(), './package.json');
const artAppConfig = require(artConfigPath);
class App {
    constructor(serverConfig) {
        this.serverConfig = serverConfig;
    }
    controllers() {
        const ctrls = [];
        const bizConrtollers = path_1.join(process.cwd(), './mock');
        if (fs.existsSync(bizConrtollers)) {
            ctrls.push(path_1.join(bizConrtollers, './dist/**/*'));
        }
        ctrls.push(path_1.join(__dirname, './controllers/*'));
        return ctrls;
    }
    createApp() {
        const app = express_1.default();
        const publicPath = path_1.join(process.cwd(), './public');
        app.use('/public', compression_1.default(), express_1.default.static(publicPath));
        routing_controllers_1.useExpressServer(app, {
            routePrefix: '/mock_api',
            controllers: this.controllers()
        });
        return app;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = this.serverConfig.host || process.env.SERVER_HOST;
            const port = Number(this.serverConfig.port || process.env.SERVER_PORT);
            const appName = artAppConfig.name;
            let expressPort = null;
            try {
                expressPort = yield choosePort_1.default(host, port);
            }
            catch (err) {
                return console.log(err);
            }
            const app = this.createApp();
            if (expressPort === null) {
                return;
            }
            app.listen(expressPort, host, (err) => {
                if (err) {
                    return console.log(err);
                }
                const urls = prepareUrls_1.default('http', host, expressPort);
                // printInstructions(appName, urls);
                printInstructionsMiniprogram_1.default(appName, urls);
            });
        });
    }
}
exports.default = App;
