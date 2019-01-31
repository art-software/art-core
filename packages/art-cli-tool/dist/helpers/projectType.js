"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const ARTCONFIGFILE = 'art.config.js';
const artConfigFilePath = path_1.join(process.cwd(), ARTCONFIGFILE);
exports.getProjectType = () => {
    if (!fs_1.existsSync(artConfigFilePath)) {
        throw Error(chalk_1.default.red(`Cannot found "${ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
    }
    const artConfig = require(artConfigFilePath) || {};
    return artConfig.projectType || '';
};
