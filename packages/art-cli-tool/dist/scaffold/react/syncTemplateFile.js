"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const path_1 = require("path");
const fs_1 = require("fs");
const replace_1 = __importDefault(require("replace"));
module.exports = function (scaffoldTo) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [index template] file...`);
    const indexTemplatePath = getIndexTemplatePath(scaffoldTo, scaffoldInstance.moduleName);
    const readableStream = fs_1.createReadStream(indexTemplatePath);
    readableStream.on('data', () => {
        printLog_1.printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [art_framework.js]... `);
    });
    const replaceWithString = getReplacementString(scaffoldTo);
    return new Promise((resolve, reject) => {
        readableStream.on('end', () => {
            replace_1.default({
                regex: 'art_framework.js',
                replacement: replaceWithString,
                paths: [indexTemplatePath],
                recursive: false,
                silent: true
            });
            resolve();
        });
    });
};
const getIndexTemplatePath = (scaffoldTo, name) => {
    let templatePath = '';
    let moduleName = name || '';
    moduleName = moduleName.startsWith('/') ? moduleName : '/' + moduleName;
    moduleName = ensureSlash_1.default(moduleName, false);
    templatePath = path_1.join(scaffoldTo, `./client${moduleName}/index.template.ejs`);
    return templatePath;
};
const getReplacementString = (scaffoldTo) => {
    let replacement = '';
    const artConfigPath = path_1.join(scaffoldTo, './art.config.js');
    const appArtConfig = require(artConfigPath);
    const { projectVirtualPath = '', webpack = {} } = appArtConfig;
    const version = (webpack.dll || {}).version || 'dll_version_01';
    replacement = `${projectVirtualPath}/vendors/${version}/art_framework.${version}.js`;
    return replacement;
};
