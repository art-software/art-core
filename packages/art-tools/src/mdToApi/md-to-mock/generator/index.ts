import { writeFileSync } from 'fs';
import * as path from 'path';
import recast from 'recast';
import { mkdirsSync } from '../../utils/mkdirsSync';

/** 
 * @description 将最终生成 TsAst 写入进文件
 * @param {Object} ast 最终的 TsAst
 */
export const appendToFile = (ast, output) => {
  try {
    if (mkdirsSync(path.dirname(output))) {
      writeFileSync(output, `${recast.prettyPrint(ast, {tabWidth: 2}).code.replace(/\"/g, `\'`)}`, 'utf8');
    }
  } catch (err) { console.log('err:', err); }
};
