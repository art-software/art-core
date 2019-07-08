"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createPromiseTsAst_1 = require("./createPromiseTsAst");
const createInterfaceTsAst_1 = require("./createInterfaceTsAst");
const integrateTsAst_1 = require("./integrateTsAst");
const tsFileAstTpl_1 = __importDefault(require("../../template/tsFileAstTpl"));
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const createResponseTsAst_1 = require("./createResponseTsAst");
/**
 * @description 生成最终需要的tsAST数据
 * @param {transformData} transformData 需要转换的已抽离好的mdAST
 * @returns 最终tsAST数据
 */
exports.createTsAst = (transformData) => {
    createResponseTsAst_1.createResponseTsAst();
    createPromiseTsAst_1.createPromiseTsAst(transformData.mdAstPromisePart);
    createInterfaceTsAst_1.createInterfaceTsAst(transformData.mdAstInterfacePart);
    const tsAst = objDeepCopy_1.objDeepCopy(tsFileAstTpl_1.default);
    tsAst.program.body = integrateTsAst_1.tsAstBody;
    return tsAst;
};
