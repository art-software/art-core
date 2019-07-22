import { ITransformData } from '../extractor';
import { createImportControllerTsAst } from './createImportTsAst';
import { createClassTsAst } from './createClassTsAst';
import { objDeepCopy } from '../../utils/objDeepCopy';
import tsFileAst from '../../template/tsFileAstTpl';

/** 
 * @description 生成最终需要的tsAST数据
 * @param {transformData} transformData 需要转换的已抽离好的mdAST
 * @returns 最终tsAST数据
 */
export const createMockTsAst = (transformData: ITransformData, output: string) => {
  const tsAst = objDeepCopy(tsFileAst);
  tsAst.program.body.push(
    createImportControllerTsAst(transformData.mdAstMockPart),
    createClassTsAst(transformData.mdAstMockPart, output)
  );
  return tsAst;
};
