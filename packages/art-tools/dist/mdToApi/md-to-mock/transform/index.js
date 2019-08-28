"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createImportTsAst_1 = require("./createImportTsAst");
const createClassTsAst_1 = require("./createClassTsAst");
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const tsFileAstTpl_1 = require("../../template/tsFileAstTpl");
/**
 * @description 生成最终需要的tsAST数据
 * @param {transformData} transformData 需要转换的已抽离好的mdAST
 * @returns 最终tsAST数据
 */
exports.createMockTsAst = (transformData, output, moduleName) => {
    const tsAst = objDeepCopy_1.objDeepCopy(tsFileAstTpl_1.tsFileAstTpl);
    tsAst.program.body.push(createImportTsAst_1.createImportControllerTsAst(transformData.mdAstMockPart), createClassTsAst_1.createClassTsAst(transformData.mdAstMockPart, output, moduleName));
    return tsAst;
};
