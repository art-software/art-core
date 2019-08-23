"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("art-server-mock-miniprogram/dist/index"));
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const appConfig_1 = __importDefault(require("../config/appConfig"));
const MOCK_SERVER_PORT = appConfig_1.default.get('MOCK_SERVER_PORT');
const app = new index_1.default({
    port: MOCK_SERVER_PORT
});
app.start()
    .catch((err) => {
    return console.log(chalkColors_1.warningText('Error: '), err);
});
process.on('uncaughtException', (err) => {
    console.log(chalkColors_1.warningText('uncaughtException: '), err);
});
