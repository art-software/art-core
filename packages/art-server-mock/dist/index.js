"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
require("reflect-metadata");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const Application_1 = __importDefault(require("./Application"));
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
routing_controllers_1.useContainer(typedi_1.Container);
const app = new Application_1.default();
app.start().catch((err) => {
    return console.log(chalkColors_1.warningText('Error: '), err);
});
process.on('uncaughtException', (err) => {
    console.log(chalkColors_1.warningText('uncaughtException: '), err);
});
