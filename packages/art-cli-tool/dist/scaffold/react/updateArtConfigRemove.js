"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const path_1 = require("path");
const fs_1 = require("fs");
const escodegen_1 = __importDefault(require("escodegen"));
const esprima = require('esprima');
const replace_1 = __importDefault(require("replace"));
const path_2 = __importDefault(require("path"));
module.exports = (moduleEntry) => {
    printLog_1.printInstructions(`Update [art config] files...`);
    const artConfigPath = path_1.join(process.cwd(), './art.config.js');
    const readableStream = fs_1.createReadStream(artConfigPath);
    const buffers = [];
    const moduleList = [];
    for (const module in moduleEntry) {
        moduleList.push(path_2.default.dirname(moduleEntry[module][0]));
    }
    readableStream.on('data', (data) => { buffers.push(data); });
    readableStream.on('end', () => {
        const fileBuffer = Buffer.concat(buffers);
        const ast = esprima.parseScript(fileBuffer.toString(), {}, (node) => {
            if (node.type === 'Property' && node.key.type === 'Identifier' && node.key.name === 'entry'
                && node.value.type === 'ObjectExpression') {
                const propertyValueList = [];
                for (const item of node.value.properties) {
                    propertyValueList.push(item.value.elements[0].value.split('/index.tsx')[0]);
                }
                for (const list of moduleList) {
                    const index = propertyValueList.indexOf(list);
                    if (index > -1) {
                        node.value.properties.splice(index, 1);
                        propertyValueList.splice(index, 1);
                    }
                }
            }
        });
        const sourceCode = escodegen_1.default.generate(ast);
        const entryRegex = /(entry.*?\},)/s;
        const newEntry = sourceCode.match(entryRegex);
        if (newEntry === null) {
            return;
        }
        replace_1.default({
            regex: /(entry.*?\},)/s,
            replacement: newEntry[0],
            paths: [artConfigPath],
            recursive: false,
            silent: true
        });
    });
};
