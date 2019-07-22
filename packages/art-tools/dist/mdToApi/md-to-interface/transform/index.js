"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPromiseTsAst_1 = require("./createPromiseTsAst");
const createInterfaceTsAst_1 = require("./createInterfaceTsAst");
const integrateTsAst_1 = require("./integrateTsAst");
const tsFileAstTpl_1 = require("../../template/tsFileAstTpl");
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const createResponseTsAst_1 = require("./createResponseTsAst");
/**
 * @description 生成最终需要的tsAST数据
 * @param {transformData} transformData 需要转换的已抽离好的mdAST
 * @param {string} output 输出文件路径
 * @returns 最终tsAST数据
 */
exports.createTsAst = (transformData, output) => {
    createResponseTsAst_1.createResponseTsAst();
    createPromiseTsAst_1.createPromiseTsAst(transformData.mdAstPromisePart, output);
    createInterfaceTsAst_1.createInterfaceTsAst(transformData.mdAstInterfacePart);
    const tsAst = objDeepCopy_1.objDeepCopy(tsFileAstTpl_1.tsFileAstTpl);
    tsAst.program.body = integrateTsAst_1.tsAstBody;
    return tsAst;
};
