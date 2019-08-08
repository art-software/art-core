"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createInterfaceName_1 = require("./createInterfaceName");
const createInterfaceBody_1 = require("./createInterfaceBody");
const integrateTsAst_1 = require("./integrateTsAst");
const MarkDown_1 = require("../../constant/MarkDown");
/**
 * @description 生成interface的方法
 * @param {Array} interfaceChunkGather 截取出的每一个interface的mdAST
 */
exports.createInterfaceTsAst = (interfaceChunkGather) => {
    interfaceChunkGather.forEach((value) => {
        const interfaceName = createInterfaceName_1.createInterfaceName((value).detail);
        const interfaceBody = createInterfaceBody_1.createInterfaceBody((value).explain, MarkDown_1.HIGHEST_PARENT);
        integrateTsAst_1.collateInterfaceAst(interfaceName, interfaceBody);
    });
};
