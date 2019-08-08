
import { objDeepCopy } from '../../utils/objDeepCopy';
import { findAllIndex } from '../../utils/findAllIndex';
import { firstWordUpperCase } from '../../utils/firstWordUpperCase';
import { exportInterfaceAstTpl } from '../../template/interfaceTsAstTpl';
import { createChildrenInterface } from './createInterfaceChild';
import { createEnum } from './createEnumTsAst';
import { ISingleEnumAst, TsAstIdentifier } from '../../constant/TSAnnotationMap';
import { getTypeAnnotation } from './getTypeAnnotation';
import { checkRepeatName } from './nameSpaceControl';
import { ExplainTableHeader, ParamType, INTERFACE_NAME_PREFIX, MdToJsTypeMap } from '../../constant/MarkDown';
import { toCamelCase } from '../../utils/toCamelCase';

/** 
 * @description 生成interface的body部分
 * @param {Array} explainTable api的explain表格块
 * @param {String} currentParent 当前interface的父级元素
 */
export const createInterfaceBody = (explainTable: any, currentParent: string) => {
  // 获取对应的参数名，类型，说明，parents, 示例的index
  const [
    nameIndex,
    typeIndex,
    parentsIndex,
    enumIndex,
    renameIndex
  ] = findAllIndex(
    [
      ExplainTableHeader.paramsName,
      ExplainTableHeader.type,
      ExplainTableHeader.parents,
      ExplainTableHeader.valueOptions,
      ExplainTableHeader.rename
    ],
    explainTable.header
  );
  const result: any[] = [];
  let lastTypeAnnotation: any;
  explainTable.cells.forEach((value) => {
    const bodyTemplate = objDeepCopy(
      exportInterfaceAstTpl.declaration.body.body[0]
    );
    const valueName = value[nameIndex];
    if (valueName[valueName.length - 1] === '?' || valueName[valueName.length - 1] === '？') {
      value[nameIndex] = valueName.substr(0, valueName.length - 1);
      bodyTemplate.optional = true;
    }
    const isSpecificArr = Boolean(value[typeIndex].replace(/\([^\)]*\)/g, ''));
    value[typeIndex] = isSpecificArr ? value[typeIndex].toLowerCase() : MdToJsTypeMap[value[typeIndex].toLowerCase()];
    if (value[parentsIndex] === currentParent) {
      bodyTemplate.key.name = value[nameIndex];
      bodyTemplate.typeAnnotation = getTypeAnnotation(value[typeIndex], value[nameIndex]);
      result.push(bodyTemplate);
      lastTypeAnnotation = (result[result.length - 1]).typeAnnotation.typeAnnotation;
    }
    if (value[parentsIndex] === currentParent && value[enumIndex]) {
      const enumValue: ISingleEnumAst = {
        currentName: value[nameIndex],
        rename: value[renameIndex],
        type: value[typeIndex],
        option: value[enumIndex]
      };
      createEnum(enumValue, (enumName) => {
        lastTypeAnnotation.type = TsAstIdentifier.annotationType;
        lastTypeAnnotation.typeName.name = enumName;
      });
    }
    const typeValue = value[typeIndex];
    const arrChildrenType = (typeValue.substring(typeValue.indexOf('(') + 1, typeValue.indexOf(')'))).toLowerCase();
    const removeChilrenType = typeValue.replace(/\([^\)]*\)/g, '');
    const isObjectArr = arrChildrenType === ParamType.object && removeChilrenType === ParamType.array;
    value[typeIndex] = isObjectArr ? ParamType.array : value[typeIndex];
    if (value[parentsIndex] === currentParent && ([ParamType.array, ParamType.object].includes(typeValue) || isObjectArr)) {
      const childrenChunk = {} as any;
      const formatName = toCamelCase((INTERFACE_NAME_PREFIX + firstWordUpperCase(value[nameIndex])), '_');
      const childrenName = checkRepeatName(value[renameIndex]) || checkRepeatName(formatName);
      if (removeChilrenType === ParamType.array) {
        lastTypeAnnotation.elementType.typeName.name = childrenName;
      }
      if (removeChilrenType === ParamType.object) {
        lastTypeAnnotation.typeName.name = childrenName;
      }
      childrenChunk.header = explainTable.header;
      // 这里三级嵌套没有生成的原因主要是因为二级的table已经只包含父级为子interface的，再在其中找就没了
      const childrenNameGather = [value[nameIndex]];
      childrenChunk.cells = explainTable.cells.filter((cell) => {
        // 这里先找到符合该项的每一个子集，如果子集是对象，再把该对象子集找到
        if ([ParamType.array, ParamType.object].includes(cell[typeIndex])) {
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
      createChildrenInterface(childrenChunk, value[parentsIndex] + '.' + value[nameIndex], childrenName);
    }
  });
  return result;
};