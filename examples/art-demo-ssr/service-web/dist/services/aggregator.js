"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aggregator_1 = __importDefault(require("../../../../../packages/art-ssr-aggregator-node/dist/aggregator"));
exports.aggregator = new aggregator_1.default({
    url: '/batch',
    config: {
        baseURL: 'http://me.dev.com:8899/'
    }
});
