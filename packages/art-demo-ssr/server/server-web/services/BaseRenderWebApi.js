"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebApiServer_1 = __importDefault(require("art-lib-common/dist/core-server/WebApiServer"));
const SERVER_HOST_RENDER = process.env.SERVER_HOST_RENDER || '';
const SERVER_PORT_RENDER = process.env.SERVER_PORT_RENDER || '';
class BaseRenderWebApi extends WebApiServer_1.default {
    constructor() {
        const baseUrl = `http://${SERVER_HOST_RENDER}:${SERVER_PORT_RENDER}`;
        super({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
exports.BaseRenderWebApi = BaseRenderWebApi;
exports.baseRenderWebApi = new BaseRenderWebApi();
