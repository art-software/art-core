"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aggregator_1 = __importDefault(require("art-ssr-aggregator-node/dist/aggregator"));
const SERVER_HOST_RENDER = process.env.SERVER_HOST_RENDER || '';
const SERVER_PORT_RENDER = process.env.SERVER_PORT_RENDER || '';
exports.aggregator = new aggregator_1.default({
    url: `http://${SERVER_HOST_RENDER}:${SERVER_PORT_RENDER}/batch`
});
