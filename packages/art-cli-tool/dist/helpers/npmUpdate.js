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
exports.npmUpdate = () => {
    if (!isAtArtProjectRoot_1.isAtArtProjectRoot()) {
        throw Error(chalk_1.default.red(`Cannot found "${FileNames_1.FileNames.ARTCONFIGFILE}" file, please executing art cli command at art project root path`));
    }
    const notArtPkgGlob = '!art-*';
    const bin = process.env.STAGE === Stage_1.Stage.dev ?
        path_1.join(__dirname, '../../../../node_modules/.bin/npm-check') :
        path_1.join(process.cwd(), 'node_modules/.bin/npm-check');
    executeNodeScript_1.default(bin, '--update', '--ignore', notArtPkgGlob, '--skip-unused');
};
