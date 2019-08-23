"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RenderServer_1 = __importDefault(require("../../../../packages/art-ssr-render/dist/RenderServer"));
const createGetComponent_1 = __importDefault(require("../../../../packages/art-ssr-render/dist/createGetComponent"));
const path_1 = __importDefault(require("path"));
const renderServer = new RenderServer_1.default({
    host: 'me.dev.com',
    port: 8899,
    getComponent: createGetComponent_1.default({
        Main: path_1.default.join(__dirname, '../../web/debug-ssr/demo/ssr/main/bundle.js')
    })
});
renderServer.start();
