"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const interfaceTsAstTpl_1 = require("../../template/interfaceTsAstTpl");
const MarkDown_1 = require("../../constant/MarkDown");
/**
 * @description 映射参数的类型和ts的类型
 * @param {Strinng} type 当前参数的类型
 * @param {String} childrenInterfaceName 对应对象类型的interfaceName
 * @returns 每次key对应的typeAnnotation节点
 */
exports.getTypeAnnotation = (type, childrenInterfaceName) => {
    const anntationTpl = objDeepCopy_1.objDeepCopy(interfaceTsAstTpl_1.exportInterfaceAstTpl.declaration.body.body[0].typeAnnotation);
    anntationTpl.typeAnnotation.type = TSAnnotationMap_1.TypeAnnotations[type.toLowerCase()];
    const arrChildrenType = (type.substring(type.indexOf('(') + 1, type.indexOf(')'))).toLowerCase();
    const removeChilrenType = type.replace(/\([^\)]*\)/g, '');
    const isObjectArr = arrChildrenType === MarkDown_1.ParamType.object && removeChilrenType === MarkDown_1.ParamType.array;
    if (type === MarkDown_1.ParamType.array || isObjectArr) {
        anntationTpl.typeAnnotation.elementType.typeName.name = childrenInterfaceName;
    }
    if (type === MarkDown_1.ParamType.object) {
        anntationTpl.typeAnnotation.typeName.name = childrenInterfaceName;
    }
    // 括号中有值，并且本身是个array
    if (arrChildrenType && removeChilrenType === MarkDown_1.ParamType.array) {
        const childrenType = MarkDown_1.MdToJsTypeMap[arrChildrenType];
        anntationTpl.typeAnnotation.elementType.type = TSAnnotationMap_1.TypeAnnotations[childrenType];
        anntationTpl.typeAnnotation.type = TSAnnotationMap_1.TypeAnnotations[MarkDown_1.ParamType.array];
    }
    return anntationTpl;
};
