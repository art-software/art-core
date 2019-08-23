"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import AjaxAst from "src/template/ajaxResultAst";
const MarkDown_1 = require("../../constant/MarkDown");
const extractMdAstChunk_1 = require("./extractMdAstChunk");
/**
 * 抽取当前需要转换的信息， 1.基本返回数据结构. 2. promise结构. 3. 每个interface结构.
 */
exports.extractNeedTransformData = (mdAST) => {
    const transformData = {
        mdAstMockPart: extractMdAstChunk_1.extractMdAstChunk(mdAST, [MarkDown_1.MarkDownHeaders.DETAIL, MarkDown_1.MarkDownHeaders.EXAMPLE])
    };
    return transformData;
};
