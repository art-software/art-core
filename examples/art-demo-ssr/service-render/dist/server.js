"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RenderServer_1 = __importDefault(require("../../../../packages/art-ssr-render/dist/RenderServer"));
const renderServe = new RenderServer_1.default({
    host: 'me.dev.com',
    port: 8899
});
renderServe.start();
