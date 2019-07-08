import enumAst from '../../template/enumTsAstTpl';
import { ISingleEnumAst, EnumTypeAnnotations } from '../../constant/TSAnnotationMap';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { toHump } from '../../utils/toHump';
import { firstWordUpperCase } from '../../utils/firstWordUpperCase';
import { checkRepeatName } from './nameSpaceControl';
import { collateEnumAst } from './integrateTsAst';
import { ENUMVALUEDECOLLATOR, MdToJsTypeMap } from '../../constant/MarkDown';

/** 
 * @description 生成一个枚举类型用于标示特定的参数类型
 * @param {ISingleEnumAst} 每一个需要枚举的信息
 * @param {function} 执行生成enum之后的回调，可在其中获取enumName
 */
export const createEnum = (singleCell: ISingleEnumAst, enumCreated?: (enumName: string) => void) => {
  const enumValues = singleCell.option.replace(/，/ig, ',').replace(/\s*/g, '').split(',');
  const members: any[] = [];
  let enumName = singleCell.rename || firstWordUpperCase(toHump(singleCell.currentName, '_'));
  enumName = checkRepeatName(enumName);
  enumValues.forEach((value) => {
    const singleMember = objDeepCopy(enumAst.declaration.members[0]) as any;
    singleMember.id.name = toHump(value.split(ENUMVALUEDECOLLATOR)[0], '_');
    singleMember.initializer.type = EnumTypeAnnotations[MdToJsTypeMap[singleCell.type]];
    singleMember.initializer.value = value.split(ENUMVALUEDECOLLATOR)[1];
    members.push(singleMember);
  });
  collateEnumAst(enumName, members);
  if (enumCreated) {
    enumCreated(enumName);
  }
};