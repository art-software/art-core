"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const findAllIndex_1 = require("../../utils/findAllIndex");
const firstWordUpperCase_1 = require("../../utils/firstWordUpperCase");
const interfaceTsAstTpl_1 = require("../../template/interfaceTsAstTpl");
const createInterfaceChild_1 = require("./createInterfaceChild");
const createEnumTsAst_1 = require("./createEnumTsAst");
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const getTypeAnnotation_1 = require("./getTypeAnnotation");
const nameSpaceControl_1 = require("./nameSpaceControl");
const MarkDown_1 = require("../../constant/MarkDown");
const toCamelCase_1 = require("../../utils/toCamelCase");
/**
 * @description 生成interface的body部分
 * @param {Array} explainTable api的explain表格块
 * @param {String} currentParent 当前interface的父级元素
 */
exports.createInterfaceBody = (explainTable, currentParent) => {
    // 获取对应的参数名，类型，说明，parents, 示例的index
    const [nameIndex, typeIndex, parentsIndex, enumIndex, renameIndex] = findAllIndex_1.findAllIndex([
        MarkDown_1.ExplainTableHeader.paramsName,
        MarkDown_1.ExplainTableHeader.type,
        MarkDown_1.ExplainTableHeader.parents,
        MarkDown_1.ExplainTableHeader.valueOptions,
        MarkDown_1.ExplainTableHeader.rename
    ], explainTable.header);
    const result = [];
    let lastTypeAnnotation;
    explainTable.cells.forEach((value) => {
        const bodyTemplate = objDeepCopy_1.objDeepCopy(interfaceTsAstTpl_1.exportInterfaceAstTpl.declaration.body.body[0]);
        const valueName = value[nameIndex];
        if (valueName[valueName.length - 1] === '?' || valueName[valueName.length - 1] === '？') {
            value[nameIndex] = valueName.substr(0, valueName.length - 1);
            bodyTemplate.optional = true;
        }
        const isSpecificArr = Boolean(value[typeIndex].replace(/\([^\)]*\)/g, ''));
        value[typeIndex] = isSpecificArr ? value[typeIndex].toLowerCase() : MarkDown_1.MdToJsTypeMap[value[typeIndex].toLowerCase()];
        if (value[parentsIndex] === currentParent) {
            bodyTemplate.key.name = value[nameIndex];
            bodyTemplate.typeAnnotation = getTypeAnnotation_1.getTypeAnnotation(value[typeIndex], value[nameIndex]);
            result.push(bodyTemplate);
            lastTypeAnnotation = (result[result.length - 1]).typeAnnotation.typeAnnotation;
        }
        if (value[parentsIndex] === currentParent && value[enumIndex]) {
            const enumValue = {
                currentName: value[nameIndex],
                rename: value[renameIndex],
                type: value[typeIndex],
                option: value[enumIndex]
            };
            createEnumTsAst_1.createEnum(enumValue, (enumName) => {
                lastTypeAnnotation.type = TSAnnotationMap_1.TsAstIdentifier.annotationType;
                lastTypeAnnotation.typeName.name = enumName;
            });
        }
        const typeValue = value[typeIndex];
        const arrChildrenType = (typeValue.substring(typeValue.indexOf('(') + 1, typeValue.indexOf(')'))).toLowerCase();
        const removeChilrenType = typeValue.replace(/\([^\)]*\)/g, '');
        const isObjectArr = arrChildrenType === MarkDown_1.ParamType.object && removeChilrenType === MarkDown_1.ParamType.array;
        value[typeIndex] = isObjectArr ? MarkDown_1.ParamType.array : value[typeIndex];
        if (value[parentsIndex] === currentParent && ([MarkDown_1.ParamType.array, MarkDown_1.ParamType.object].includes(typeValue) || isObjectArr)) {
            const childrenChunk = {};
            const formatName = toCamelCase_1.toCamelCase((MarkDown_1.INTERFACE_NAME_PREFIX + firstWordUpperCase_1.firstWordUpperCase(value[nameIndex])), '_');
            const childrenName = nameSpaceControl_1.checkRepeatName(value[renameIndex]) || nameSpaceControl_1.checkRepeatName(formatName);
            if (removeChilrenType === MarkDown_1.ParamType.array) {
                lastTypeAnnotation.elementType.typeName.name = childrenName;
            }
            if (removeChilrenType === MarkDown_1.ParamType.object) {
                lastTypeAnnotation.typeName.name = childrenName;
            }
            childrenChunk.header = explainTable.header;
            // 这里三级嵌套没有生成的原因主要是因为二级的table已经只包含父级为子interface的，再在其中找就没了
            const childrenNameGather = [value[nameIndex]];
            childrenChunk.cells = explainTable.cells.filter((cell) => {
                // 这里先找到符合该项的每一个子集，如果子集是对象，再把该对象子集找到
                if ([MarkDown_1.ParamType.array, MarkDown_1.ParamType.object].includes(cell[typeIndex])) {
                    const cellName = cell[nameIndex];
                    const cellNameLastIndex = cellName.length - 1;
                    const parentNodeName = cellName[cellNameLastIndex] === '?' || cellName[cellNameLastIndex] === '？' ?
                        cellName.substr(0, cellNameLastIndex) : cellName;
                    childrenNameGather.push(cell[parentsIndex] + '.' + parentNodeName);
                }
                if (childrenNameGather.includes(cell[parentsIndex])) {
                    return cell;
                }
            });
            createInterfaceChild_1.createChildrenInterface(childrenChunk, value[parentsIndex] + '.' + value[nameIndex], childrenName);
        }
    });
    return result;
};
