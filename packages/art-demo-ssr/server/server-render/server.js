"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RenderServer_1 = __importDefault(require("art-ssr/dist/RenderServer"));
const createGetComponent_1 = __importDefault(require("art-ssr/dist/createGetComponent"));
const path_1 = __importDefault(require("path"));
const renderServer = new RenderServer_1.default({
    devMode: true,
    getComponent: createGetComponent_1.default({
        Home: path_1.default.join(__dirname, '../../debug-ssr/demo/ssr/react/home/bundle.js'),
        Product: path_1.default.join(__dirname, '../../debug-ssr/demo/ssr/react/product/bundle.js')
    }),
    host: 'localhost',
    port: 8888
});
renderServer.start();
