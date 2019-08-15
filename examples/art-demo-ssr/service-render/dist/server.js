"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../../packages/art-ssr-render/dist/index");
const path_1 = __importDefault(require("path"));
const renderServe = new index_1.RenderServer({
    host: 'me.dev.com',
    port: 8899,
    getComponent: index_1.createGetComponent({
        Main: path_1.default.join(__dirname, '../../web/debug-ssr/demo/ssr/main/bundle.js')
    })
});
renderServe.start();
