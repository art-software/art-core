import { ITransformData } from '../extractor';
import { createPromiseTsAst } from './createPromiseTsAst';
import { createInterfaceTsAst } from './createInterfaceTsAst';
import { tsAstBody } from './integrateTsAst';
import { tsFileAstTpl } from '../../template/tsFileAstTpl';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { createResponseTsAst } from './createResponseTsAst';

/** 
 * @description 生成最终需要的tsAST数据
 * @param {transformData} transformData 需要转换的已抽离好的mdAST
 * @param {string} output 输出文件路径
 * @returns 最终tsAST数据
 */
export const createTsAst = (transformData: ITransformData, output: string) => {
  createResponseTsAst();
  createPromiseTsAst(transformData.mdAstPromisePart, output);
  createInterfaceTsAst(transformData.mdAstInterfacePart);
  const tsAst = objDeepCopy(tsFileAstTpl);
  tsAst.program.body = tsAstBody;
  return tsAst;
};