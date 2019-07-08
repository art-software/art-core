import { ITransformData } from '../extractor';
import { createPromiseTsAst } from './createPromiseTsAst';
import { createInterfaceTsAst } from './createInterfaceTsAst';
import { tsAstBody } from './integrateTsAst';
import tsFileAst from '../../template/tsFileAstTpl';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { createResponseTsAst } from './createResponseTsAst';

/** 
 * @description 生成最终需要的tsAST数据
 * @param {transformData} transformData 需要转换的已抽离好的mdAST
 * @returns 最终tsAST数据
 */
export const createTsAst = (transformData: ITransformData) => {
  createResponseTsAst();
  createPromiseTsAst(transformData.mdAstPromisePart);
  createInterfaceTsAst(transformData.mdAstInterfacePart);
  const tsAst = objDeepCopy(tsFileAst) as any;
  tsAst.program.body = tsAstBody;
  return tsAst;
};