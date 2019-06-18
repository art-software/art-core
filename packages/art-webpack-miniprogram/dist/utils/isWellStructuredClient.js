"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// check whether client root folder contains necessary files for a valid miniprogram structure.
const paths_1 = __importDefault(require("../config/paths"));
const fs_1 = require("fs");
const path_1 = require("path");
const FileNames_1 = require("../constants/FileNames");
const chalk_1 = __importDefault(require("chalk"));
const clientRootContains = (fileName) => {
    const clientPath = paths_1.default.appSrc;
    return fs_1.existsSync(path_1.join(clientPath, fileName));
};
exports.isWellStructuredClient = () => {
    if (!clientRootContains(FileNames_1.APPJSON)) {
        throw new Error(`${chalk_1.default.red(`Invalid miniprogram client structure, file ${FileNames_1.APPJSON} not found in client root`)}`);
    }
    if (!clientRootContains(FileNames_1.APPJS) && !clientRootContains(FileNames_1.APPTS)) {
        throw new Error(`${chalk_1.default.red(`Invalid miniprogram client structure, file ${FileNames_1.APPJS} or ${FileNames_1.APPTS} not found in client root`)}`);
    }
    return true;
};
