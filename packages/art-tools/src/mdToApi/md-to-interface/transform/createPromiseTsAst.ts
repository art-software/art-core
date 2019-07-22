import path from 'path';
import { firstWordUpperCase } from '../../utils/firstWordUpperCase';
import { findAllIndex } from '../../utils/findAllIndex';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { firstWordLowerCase } from '../../utils/firstWordLowerCase';
import { interfacePromiseAstTpl } from '../../template/interfacePromiseTsAsTpl';
import { TypeAnnotations, ISingleEnumAst, TsAstIdentifier } from '../../constant/TSAnnotationMap';
import { createEnum } from './createEnumTsAst';
import { createInterfaceName } from './createInterfaceName';
import { ParamsTableHeader, RESPONSE_NAME_SUFFIX, INTERFACE_NAME_PREFIX } from '../../constant/MarkDown';
import { collateInterfaceAst } from './integrateTsAst';

/** 
 * @description 生成一个promise的interface结构
 * @param {Array} interfaceChunkGather 抽取出每一个api的'detail', 'params'组成的数组
 * @param {string} output 输出文件路径
 */
export const createPromiseTsAst = (interfaceChunkGather, output: string) => {
  const outputFileName = firstWordUpperCase(path.basename(output.split('.')[0]));
  const tplName = `${INTERFACE_NAME_PREFIX}${firstWordUpperCase(outputFileName)}${RESPONSE_NAME_SUFFIX}`;
  const tplBody: any[] = [];
  interfaceChunkGather.forEach((value) => {
    const singleBody = objDeepCopy(interfacePromiseAstTpl.declaration.body.body[0]) as any;
    const everyInterfaceName = createInterfaceName((value).detail);
    singleBody.key.name = firstWordLowerCase(everyInterfaceName.slice(1)); // every key name
    singleBody.parameters = createPromiseParameters(value.params); // every key params
    singleBody.typeAnnotation.typeAnnotation.typeParameters.params[0].typeParameters.params[0].typeName.name = everyInterfaceName;
    tplBody.push(singleBody); // 相当于添加每一个接口的promise
  });
  collateInterfaceAst(tplName, tplBody, interfacePromiseAstTpl);
};

/** 
 * @description 生成每一个promise的key参数部分
 * @param {Array} paramsTable 每一个api的params表格块
 * @returns {Array} key部分的参数数组ast
 */
export const createPromiseParameters = (paramsTable) => {
  const parameters: any[] = [];
  const [nameIndex, typeIndex, enumIndex, renameIndex] =
  findAllIndex([ParamsTableHeader.paramsName, ParamsTableHeader.type, ParamsTableHeader.valueOptions, ParamsTableHeader.rename], paramsTable.header);
  paramsTable.cells.forEach((value) => {
    const singleParam = objDeepCopy(interfacePromiseAstTpl.declaration.body.body[0].parameters[0]);
    singleParam.name = value[nameIndex];
    singleParam.typeAnnotation.typeAnnotation.type = TypeAnnotations[value[typeIndex].toLowerCase()];
    if (value[enumIndex]) {
      const enumValue: ISingleEnumAst = {
        currentName: value[nameIndex],
        rename: value[renameIndex],
        type: value[typeIndex],
        option: value[enumIndex]
      };
      createEnum(enumValue, (enumName) => {
        singleParam.typeAnnotation.typeAnnotation.type = TsAstIdentifier.annotationType;
        singleParam.typeAnnotation.typeAnnotation.typeName.name = enumName;
      });
    }
    parameters.push(singleParam);
  });
  return parameters;
};