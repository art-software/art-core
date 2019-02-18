"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const recast_1 = __importDefault(require("recast"));
const ast_types_1 = __importDefault(require("ast-types"));
const resolve_1 = __importDefault(require("resolve"));
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const isNpmDependency = (path) => {
    const regex = /node_modules/g;
    return regex.test(path);
};
// extract import statement from js/ts files
exports.dependencyExtractor = (filePath) => {
    const file = fs_1.readFileSync(filePath, { encoding: 'utf8' });
    const ast = recast_1.default.parse(file, {
        tokens: false,
        parser: require('recast/parsers/typescript')
    });
    const importAsts = [];
    const dependencies = [];
    ast_types_1.default.visit(ast, {
        visitImportDeclaration(path) {
            const importNode = path.node;
            const source = importNode.source.value;
            if (typeof source !== 'string') {
                return this.traverse(path);
            }
            const resolvedPath = resolve_1.default.sync(source, {
                basedir: path_1.dirname(filePath) + '/',
                extensions: ['.ts', '.js']
            });
            if (!isNpmDependency(resolvedPath)) {
                return this.traverse(path);
            }
            if (importNode.comments) {
                importNode.comments.length = 0;
            }
            importAsts.push(resolvedPath);
            this.traverse(path);
        }
    });
    importAsts.forEach((resolvedPath) => {
        // const output = recast.print(astNode).code;
        console.log(chalk_1.default.green('import =>  '), resolvedPath);
        dependencies.push(resolvedPath);
    });
    return dependencies;
};
