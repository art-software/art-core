"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const integrateTsAst_1 = require("./integrateTsAst");
const responseTsAstTpl_1 = __importDefault(require("../../template/responseTsAstTpl"));
/**
 * @description 生成返回数据结构的基本interface
 */
exports.createResponseTsAst = () => {
    const responseTsAst = responseTsAstTpl_1.default;
    integrateTsAst_1.saveAstToMemory(responseTsAst);
};
