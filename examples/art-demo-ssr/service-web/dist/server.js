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
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const defaultConfig = {
    application: {
        hostname: 'me.dev.com',
        port: 13333
    }
};
class Server {
    controllers() {
        const ctrls = [];
        ctrls.push(path_1.join(__dirname, './controllers/**/*.js'));
        return ctrls;
    }
    createApp() {
        const app = express_1.default();
        // @ts-ignore
        // app.use(favicon(join(__dirname, './favicon.ico')));
        routing_controllers_1.useExpressServer(app, {
            controllers: this.controllers()
        });
        return app;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const SERVER_HOST = process.env.HOSTNAME || defaultConfig.application.hostname;
            const SERVER_PORT = process.env.PORT || defaultConfig.application.port;
            if (!(SERVER_HOST && SERVER_PORT)) {
                console.log('Unknown SERVER_HOST or SERVER_PORT');
                return;
            }
            const app = this.createApp();
            const serverUrl = `${SERVER_HOST}:${SERVER_PORT}`;
            app.listen(SERVER_PORT, () => {
                console.log('Server is running at: ', serverUrl);
            });
        });
    }
}
exports.default = Server;
