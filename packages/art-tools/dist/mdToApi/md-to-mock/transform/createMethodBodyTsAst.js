"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const methodBodyTsAstTpl_1 = require("../../template/methodBodyTsAstTpl");
const recast_1 = __importDefault(require("recast"));
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const removeJsonKeyQuotes_1 = require("../../utils/removeJsonKeyQuotes");
const tsParser = require('recast/parsers/typescript');
exports.createMethodBodyTsAst = (exampleInfo) => {
    const methodBodyTsAst = objDeepCopy_1.objDeepCopy(methodBodyTsAstTpl_1.methodBodyTsAstTpl);
    const jsonBodyAst = recast_1.default.parse(`const test = ${removeJsonKeyQuotes_1.removeJsonKeyQuotes(JSON.parse(exampleInfo.text))}`, {
        parser: tsParser
    }).program.body;
    const methodBody = jsonBodyAst[0].declarations[0].init.properties;
    const methodBodyReturnTsAst = objDeepCopy_1.objDeepCopy(methodBodyTsAstTpl_1.methodBodyReturnTsAstTpl);
    methodBodyReturnTsAst.argument.properties = methodBody;
    methodBodyReturnTsAst.argument.type = TSAnnotationMap_1.DataExpression.object;
    methodBodyTsAst.body = [methodBodyReturnTsAst];
    return methodBodyTsAst;
};
