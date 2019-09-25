"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const path_1 = require("path");
const fs_1 = require("fs");
const replace_1 = __importDefault(require("replace"));
// TODO update server.ts
module.exports = function (scaffoldTo, moduleName = '') {
    const scaffoldInstance = this;
    const serverPath = path_1.join(scaffoldTo, 'server.ts');
    const upperModuleName = getFirstCodeUpper(moduleName);
    console.log('upperModuleName::', upperModuleName);
    const replaceWithString = `${upperModuleName}: path.join(__dirname, '../../web-react/debug-ssr/demo/ssr/${moduleName}/bundle.js')`;
    console.log('replaceWithString::', replaceWithString);
    console.log('serverPath::', serverPath);
    const readableStream = fs_1.createReadStream(serverPath);
    readableStream.on('data', (data) => {
        console.log('data data');
        printLog_1.printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [server.ts]... `);
    });
    return new Promise((resolve, reject) => {
        readableStream.on('end', () => {
            console.log('end end');
            replace_1.default({
                regex: `Main: path.join(__dirname, '../../web-react/debug-ssr/demo/ssr/main/bundle.js')`,
                replacement: replaceWithString,
                paths: [serverPath],
                recursive: false,
                silent: true
            });
            resolve();
        });
    });
};
const getFirstCodeUpper = (sourceString = '') => {
    if (sourceString) {
        const arr = sourceString.split('');
        const firstUpper = arr[0].toLocaleUpperCase();
        arr.splice(0, 1, firstUpper);
        return arr.join('');
    }
    else {
        return '';
    }
};
