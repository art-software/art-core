"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../../printLog");
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const path_1 = require("path");
const fs_1 = require("fs");
const escodegen_1 = __importDefault(require("escodegen"));
const esprima = require('esprima');
const replace_1 = __importDefault(require("replace"));
module.exports = function (scaffoldTo) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [art config] files...`);
    const defaultEntryAst = {
        type: 'Property',
        key: {
            type: 'TemplateLiteral',
            quasis: [
                {
                    type: 'TemplateElement',
                    value: {
                        raw: '',
                        cooked: ''
                    },
                    tail: false
                },
                {
                    type: 'TemplateElement',
                    value: {
                        raw: '/replaceIt',
                        cooked: '/replaceIt'
                    },
                    tail: true
                }
            ],
            expressions: [
                {
                    type: 'Identifier',
                    name: 'projectVirtualPath'
                }
            ]
        },
        computed: true,
        value: {
            type: 'ArrayExpression',
            elements: [
                {
                    type: 'Literal',
                    value: './replaceIt',
                    raw: '"./replaceIt"'
                }
            ]
        },
        kind: 'init',
        method: false,
        shorthand: false
    };
    let moduleName = scaffoldInstance.moduleName || '';
    moduleName = moduleName.startsWith('/') ? moduleName : '/' + moduleName;
    moduleName = ensureSlash_1.default(moduleName, false);
    defaultEntryAst.key.quasis[1].value.raw = moduleName;
    defaultEntryAst.key.quasis[1].value.cooked = moduleName;
    defaultEntryAst.value.elements[0].value = `./client${moduleName}/index.tsx`;
    defaultEntryAst.value.elements[0].raw = `./client${moduleName}/index.tsx`;
    const artConfigPath = path_1.join(scaffoldTo, './art.config.js');
    const readableStream = fs_1.createReadStream(artConfigPath);
    const buffers = [];
    readableStream.on('data', (data) => { buffers.push(data); });
    readableStream.on('end', () => {
        const fileBuffer = Buffer.concat(buffers);
        const ast = esprima.parseScript(fileBuffer.toString(), {}, (node) => {
            if (node.type === 'Property' && node.key.type === 'Identifier' && node.key.name === 'entry'
                && node.value.type === 'ObjectExpression') {
                node.value.properties.push(defaultEntryAst);
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
