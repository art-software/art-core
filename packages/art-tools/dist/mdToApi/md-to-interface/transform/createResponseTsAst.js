"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const integrateTsAst_1 = require("./integrateTsAst");
const responseTsAstTpl_1 = require("../../template/responseTsAstTpl");
/**
 * @description 生成返回数据结构的基本interface
 */
exports.createResponseTsAst = () => {
    const responseTsAst = responseTsAstTpl_1.responseTsAstTpl;
    integrateTsAst_1.saveAstToMemory(responseTsAst);
};
