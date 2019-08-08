import { saveAstToMemory } from './integrateTsAst';
import { responseTsAstTpl } from '../../template/responseTsAstTpl';

/** 
 * @description 生成返回数据结构的基本interface
 */
export const createResponseTsAst = () => {
  const responseTsAst = responseTsAstTpl;
  saveAstToMemory(responseTsAst);
};