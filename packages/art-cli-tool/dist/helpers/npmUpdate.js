"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAtArtProjectRoot_1 = require("../helpers/isAtArtProjectRoot");
const chalk_1 = __importDefault(require("chalk"));
const FileNames_1 = require("../constants/FileNames");
const Stage_1 = require("../enums/Stage");
const path_1 = require("path");
const executeNodeScript_1 = __importDefault(require("art-dev-utils/lib/executeNodeScript"));
const fs_1 = require("fs");
exports.npmUpdate = () => {
    if (!isAtArtProjectRoot_1.isAtArtProjectRoot()) {
        throw Error(chalk_1.default.red(`Cannot found "${FileNames_1.FileNames.ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
    }
    const notArtPkgGlob = '!art-*';
    let bin;
    if (process.env.STAGE === Stage_1.Stage.dev) {
        bin = path_1.join(__dirname, '../../../../node_modules/.bin/npm-check');
    }
    else {
        const npmCheckPathOne = path_1.join(__dirname, '../../../npm-check/bin/cli.js');
        const npmCheckPathTwo = path_1.join(__dirname, '../../node_modules/.bin/npm-check');
        if (fs_1.existsSync(npmCheckPathOne)) {
            bin = npmCheckPathOne;
        }
        else if (fs_1.existsSync(npmCheckPathTwo)) {
            bin = npmCheckPathTwo;
        }
        else {
            throw new Error('No npm-check package found globally');
        }
    }
    executeNodeScript_1.default(bin, '--update', '--ignore', notArtPkgGlob, '--skip-unused');
};
