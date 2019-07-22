import { enumAstTpl } from '../../template/enumTsAstTpl';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { exportInterfaceAstTpl } from '../../template/interfaceTsAstTpl';

/** 
 * 内存中保存着所有要生成的tsAst的body部分
 */
export let tsAstBody: any[] = [];

/** 
 * @description 将enum添加到内存
 * @param {String} enum的name
 * @param {Array} enum中的body部分
 */
export const collateEnumAst = (enumName: string, enumBody) => {
  const singleEnumAst = objDeepCopy(enumAstTpl) as any;
  singleEnumAst.declaration.id.name = enumName;
  singleEnumAst.declaration.members = enumBody;
  saveAstToMemory(singleEnumAst);
};

/** 
 * @description 将最终生成的interface添加到内存
 * @param {String} interfaceName 当前interfaceName
 * @param {Array} interfaceBody 由于重复需要设置上的最终Name
 * @param {Object} interfaceAst 选择是哪一个基本ast结构
 * @param {String} finalName 最终生成的一个interfaceName
 */
export const collateInterfaceAst = (interfaceName, interfaceBody, interfaceAst?: any, finalName?: string) => {
  const singleInterfaceAst = objDeepCopy(interfaceAst || exportInterfaceAstTpl);
  singleInterfaceAst.declaration.id.name = finalName || interfaceName;
  singleInterfaceAst.declaration.body.body = interfaceBody;
  saveAstToMemory(singleInterfaceAst);
};

/** 
 * @description 将对应的tsAst结构添加到内存
 * @param {Object} ast 需要添加的ast结构
 */
export const saveAstToMemory = (ast) => {
  tsAstBody.push(ast);
};

/** 
 * @description 清空内存中的数据
 */
export const clearAstMemory = () => {
  tsAstBody = [];
};