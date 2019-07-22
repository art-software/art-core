"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enumTsAstTpl_1 = require("../../template/enumTsAstTpl");
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const interfaceTsAstTpl_1 = require("../../template/interfaceTsAstTpl");
/**
 * 内存中保存着所有要生成的tsAst的body部分
 */
exports.tsAstBody = [];
/**
 * @description 将enum添加到内存
 * @param {String} enum的name
 * @param {Array} enum中的body部分
 */
exports.collateEnumAst = (enumName, enumBody) => {
    const singleEnumAst = objDeepCopy_1.objDeepCopy(enumTsAstTpl_1.enumAstTpl);
    singleEnumAst.declaration.id.name = enumName;
    singleEnumAst.declaration.members = enumBody;
    exports.saveAstToMemory(singleEnumAst);
};
/**
 * @description 将最终生成的interface添加到内存
 * @param {String} interfaceName 当前interfaceName
 * @param {Array} interfaceBody 由于重复需要设置上的最终Name
 * @param {Object} interfaceAst 选择是哪一个基本ast结构
 * @param {String} finalName 最终生成的一个interfaceName
 */
exports.collateInterfaceAst = (interfaceName, interfaceBody, interfaceAst, finalName) => {
    const singleInterfaceAst = objDeepCopy_1.objDeepCopy(interfaceAst || interfaceTsAstTpl_1.exportInterfaceAstTpl);
    singleInterfaceAst.declaration.id.name = finalName || interfaceName;
    singleInterfaceAst.declaration.body.body = interfaceBody;
    exports.saveAstToMemory(singleInterfaceAst);
};
/**
 * @description 将对应的tsAst结构添加到内存
 * @param {Object} ast 需要添加的ast结构
 */
exports.saveAstToMemory = (ast) => {
    exports.tsAstBody.push(ast);
};
/**
 * @description 清空内存中的数据
 */
exports.clearAstMemory = () => {
    exports.tsAstBody = [];
};
