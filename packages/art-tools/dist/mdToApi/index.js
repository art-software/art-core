"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 入口文件
const fileReader_1 = require("./md-to-interface/fileReader");
const extractor_1 = require("./md-to-interface/extractor");
const transform_1 = require("./md-to-interface/transform");
const generator_1 = require("./md-to-interface/generator");
/**
 * @description 生成需要的interface方法
 * 1- 读取 md
 * 2- 抽离需要的 md 内容
 * 3- 转换为 TS-AST
 * 4- 写入内容
 */
exports.startMdToInterface = (entry, output) => {
    const mdAST = fileReader_1.readMdFile(entry);
    const transformData = extractor_1.extractNeedTransformData(mdAST);
    const interfaceAST = transform_1.createTsAst(transformData);
    generator_1.appendToFile(interfaceAST, output);
};
