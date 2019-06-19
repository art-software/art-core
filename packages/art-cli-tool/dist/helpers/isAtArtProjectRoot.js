"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FileNames_1 = require("../constants/FileNames");
const fs_1 = require("fs");
const artConfigFilePath = path_1.join(process.cwd(), FileNames_1.FileNames.ARTCONFIGFILE);
exports.isAtArtProjectRoot = () => {
    return fs_1.existsSync(artConfigFilePath);
};
