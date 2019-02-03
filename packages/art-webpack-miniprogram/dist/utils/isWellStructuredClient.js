"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// check whether client root folder contains necessary files for a valid miniprogram structure.
const paths_1 = __importDefault(require("../config/paths"));
const fs_1 = require("fs");
const path_1 = require("path");
const APPJSON = 'app.json';
const APPJS = 'app.js';
const APPTS = 'app.ts';
const clientRootContains = (fileName) => {
    const clientPath = paths_1.default.appSrc;
    return fs_1.existsSync(path_1.join(clientPath, fileName));
};
exports.isWellStructuredClient = () => {
    if (!clientRootContains(APPJSON)) {
        return false;
    }
    if (!clientRootContains(APPJS) && !clientRootContains(APPTS)) {
        return false;
    }
    return true;
};
