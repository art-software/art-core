"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const firstWordUpperCase_1 = require("../../utils/firstWordUpperCase");
const findAllIndex_1 = require("../../utils/findAllIndex");
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const firstWordLowerCase_1 = require("../../utils/firstWordLowerCase");
const interfacePromiseTsAsTpl_1 = require("../../template/interfacePromiseTsAsTpl");
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const createEnumTsAst_1 = require("./createEnumTsAst");
const createInterfaceName_1 = require("./createInterfaceName");
const MarkDown_1 = require("../../constant/MarkDown");
const integrateTsAst_1 = require("./integrateTsAst");
/**
 * @description 生成一个promise的interface结构
 * @param {Array} interfaceChunkGather 抽取出每一个api的'detail', 'params'组成的数组
 * @param {string} output 输出文件路径
 */
exports.createPromiseTsAst = (interfaceChunkGather, output) => {
    const outputFileName = firstWordUpperCase_1.firstWordUpperCase(path_1.default.basename(output.split('.')[0]));
    const tplName = `${MarkDown_1.INTERFACE_NAME_PREFIX}${firstWordUpperCase_1.firstWordUpperCase(outputFileName)}${MarkDown_1.RESPONSE_NAME_SUFFIX}`;
    const tplBody = [];
    interfaceChunkGather.forEach((value) => {
        const singleBody = objDeepCopy_1.objDeepCopy(interfacePromiseTsAsTpl_1.interfacePromiseAstTpl.declaration.body.body[0]);
        const everyInterfaceName = createInterfaceName_1.createInterfaceName((value).detail);
        singleBody.key.name = firstWordLowerCase_1.firstWordLowerCase(everyInterfaceName.slice(1)); // every key name
        singleBody.parameters = exports.createPromiseParameters(value.params); // every key params
        singleBody.typeAnnotation.typeAnnotation.typeParameters.params[0].typeParameters.params[0].typeName.name = everyInterfaceName;
        tplBody.push(singleBody); // 相当于添加每一个接口的promise
    });
    integrateTsAst_1.collateInterfaceAst(tplName, tplBody, interfacePromiseTsAsTpl_1.interfacePromiseAstTpl);
};
/**
 * @description 生成每一个promise的key参数部分
 * @param {Array} paramsTable 每一个api的params表格块
 * @returns {Array} key部分的参数数组ast
 */
exports.createPromiseParameters = (paramsTable) => {
    const parameters = [];
    const [nameIndex, typeIndex, enumIndex, renameIndex] = findAllIndex_1.findAllIndex([MarkDown_1.ParamsTableHeader.paramsName, MarkDown_1.ParamsTableHeader.type, MarkDown_1.ParamsTableHeader.valueOptions, MarkDown_1.ParamsTableHeader.rename], paramsTable.header);
    paramsTable.cells.forEach((value) => {
        const singleParam = objDeepCopy_1.objDeepCopy(interfacePromiseTsAsTpl_1.interfacePromiseAstTpl.declaration.body.body[0].parameters[0]);
        singleParam.name = value[nameIndex];
        singleParam.typeAnnotation.typeAnnotation.type = TSAnnotationMap_1.TypeAnnotations[value[typeIndex].toLowerCase()];
        if (value[enumIndex]) {
            const enumValue = {
                currentName: value[nameIndex],
                rename: value[renameIndex],
                type: value[typeIndex],
                option: value[enumIndex]
            };
            createEnumTsAst_1.createEnum(enumValue, (enumName) => {
                singleParam.typeAnnotation.typeAnnotation.type = TSAnnotationMap_1.TsAstIdentifier.annotationType;
                singleParam.typeAnnotation.typeAnnotation.typeName.name = enumName;
            });
        }
        parameters.push(singleParam);
    });
    return parameters;
};
