"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ProjectTypes_1 = require("../enums/ProjectTypes");
// @ts-ignore
const configPath = path_1.join(process.cwd(), 'art.config.js');
const artConfig = require(configPath);
exports.isWxMiniprogramEnv = artConfig.projectType === ProjectTypes_1.ProjectTypes.miniprogram;
