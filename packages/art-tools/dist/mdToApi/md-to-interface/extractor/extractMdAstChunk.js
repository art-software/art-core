"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MarkDown_1 = require("../../constant/MarkDown");
/**
 * @description 按照一个api取抽取每一个数据
 * @param {Array} mdAst 一个解析后的md语法树
 * @returns {Array} 返回一个由每个api的解析结果组成的数组
 */
exports.extractMdAstChunk = (mdAst, findTableNames) => {
    // extract every interface detail and explain add to an Object and push an Array
    const interfaceGather = [];
    let chunkStart = 0;
    mdAst.forEach((value, index) => {
        if (value.type === MarkDown_1.MarkDownIdentifier.singleInterfaceStart && index) {
            const chunkData = mdAst.slice(chunkStart, index);
            interfaceGather.push(exports.extractUseTables(findTableNames, chunkData));
        }
        if (value.type === MarkDown_1.MarkDownIdentifier.singleInterfaceStart) {
            chunkStart = index;
        }
        if (index === mdAst.length - 1) {
            const chunkData = mdAst.slice(chunkStart, index);
            interfaceGather.push(exports.extractUseTables(findTableNames, chunkData));
        }
    });
    return interfaceGather;
};
/**
 * @description 抽取一个api数据中需要用 多个 table数据
 * @param {Array} findTableNames 需要查找的table的header名称集合
 * @param {array} chunkData 一个api的数据
 * @returns {Object} 对应获取的table数据
 */
exports.extractUseTables = (findTableNames, chunkData) => {
    const userTables = {};
    findTableNames.forEach((value) => {
        userTables[value] = exports.extractChooseTable(value, chunkData);
    });
    return userTables;
};
/**
 * @description 抽取一个api数据中 单个 table的详细过程
 * @param {Array} tableText 需要查找的table的header名称
 * @param {array} chunkData 一个api的数据
 */
exports.extractChooseTable = (tableText, chunkData) => {
    let result = {};
    chunkData.forEach((value, index) => {
        // confirm right table chunk
        if (value.type === MarkDown_1.MarkDownIdentifier.headerIdentifier &&
            value.depth === MarkDown_1.TABLE_HEADER_DEPTH &&
            value.text === tableText) {
            result =
                chunkData.find((tableValue, tableIndex) => {
                    if (tableIndex > index && tableValue.type === MarkDown_1.MarkDownIdentifier.tableIdentifier) {
                        return tableValue;
                    }
                }) || {};
        }
    });
    return result;
};
