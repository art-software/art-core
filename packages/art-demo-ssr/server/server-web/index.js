"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
dotenv_1.config({
    path: path_1.join(__dirname, '.env')
});
require("reflect-metadata");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const server_1 = __importDefault(require("./server"));
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
routing_controllers_1.useContainer(typedi_1.Container);
const server = new server_1.default();
server.start().catch((err) => {
    return console.log(chalkColors_1.warningText('Error: '), err);
});
process.on('uncaughtException', (err) => {
    console.log(chalkColors_1.warningText('uncaughtException: '), err);
});
