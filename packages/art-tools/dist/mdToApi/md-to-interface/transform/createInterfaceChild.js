"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const createInterfaceBody_1 = require("./createInterfaceBody");
const interfaceTsAstTpl_1 = require("../../template/interfaceTsAstTpl");
const integrateTsAst_1 = require("./integrateTsAst");
/**
 * @description 生成子interface的方法, 当父节点不为data && 其类型为array或者object时需要创建一个interface
 * @param {Array} childrenBody 子interface的body部分数组
 * @param {String} parentName 当前子interface的父级节点path
 * @param {String} finalName 最终生成interface的name
 */
exports.createChildrenInterface = (childrenBody, parentName, finalName) => {
    const ast = objDeepCopy_1.objDeepCopy(interfaceTsAstTpl_1.exportInterfaceAstTpl);
    integrateTsAst_1.collateInterfaceAst(parentName, createInterfaceBody_1.createInterfaceBody(childrenBody, parentName), ast, finalName);
};
