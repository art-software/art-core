import { objDeepCopy } from '../../utils/objDeepCopy';
import { TypeAnnotations } from '../../constant/TSAnnotationMap';
import { exportInterfaceAstTpl } from '../../template/interfaceTsAstTpl';
import { ParamType, MdToJsTypeMap } from '../../constant/MarkDown';

/** 
 * @description 映射参数的类型和ts的类型
 * @param {Strinng} type 当前参数的类型
 * @param {String} childrenInterfaceName 对应对象类型的interfaceName
 * @returns 每次key对应的typeAnnotation节点
 */
export const getTypeAnnotation = (type: string, childrenInterfaceName: string) => {
  const anntationTpl = objDeepCopy(exportInterfaceAstTpl.declaration.body.body[0].typeAnnotation) as any;
  anntationTpl.typeAnnotation.type = TypeAnnotations[type.toLowerCase()];
  const arrChildrenType = (type.substring(type.indexOf('(') + 1, type.indexOf(')'))).toLowerCase();
  const removeChilrenType = type.replace(/\([^\)]*\)/g, '');
  const isObjectArr = arrChildrenType === ParamType.object && removeChilrenType === ParamType.array;
  if (type === ParamType.array || isObjectArr) {
    anntationTpl.typeAnnotation.elementType.typeName.name = childrenInterfaceName;
  }
  if (type === ParamType.object) {
    anntationTpl.typeAnnotation.typeName.name = childrenInterfaceName;
  }
  // 括号中有值，并且本身是个array
  if (arrChildrenType && removeChilrenType === ParamType.array) {
    const childrenType = MdToJsTypeMap[arrChildrenType];
    anntationTpl.typeAnnotation.elementType.type = TypeAnnotations[childrenType];
    anntationTpl.typeAnnotation.type = TypeAnnotations[ParamType.array];
  }
  return anntationTpl;
};