"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// miniprogram project only has one webpack entry;
const appConfig_1 = __importDefault(require("./appConfig"));
exports.miniprogramWebpackEntry = () => {
    const entry = appConfig_1.default.get('art:webpack:entry');
    return {
        entry,
        entryKey: Object.keys(entry)[0],
        entryValue: entry[Object.keys(entry)[0]]
    };
};
