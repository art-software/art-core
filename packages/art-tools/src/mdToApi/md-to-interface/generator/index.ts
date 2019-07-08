import { writeFileSync } from 'fs';
import * as path from 'path';
import recast from 'recast';
import { mkdirsSync } from '../../utils/mkdirsSync';
import { clearAstMemory } from '../transform/integrateTsAst';

/** 
 * @description 将最终生成 TsAst 写入进文件
 * @param {Object} ast 最终的 TsAst
 */
export const appendToFile = (ast, output: string) => {
  try {
    if (mkdirsSync(path.dirname(output))) {
      writeFileSync(output, `\n${recast.print(ast).code}`, 'utf8');
      clearAstMemory();
    }
  } catch (err) {
    console.log('err', err);
  }
};