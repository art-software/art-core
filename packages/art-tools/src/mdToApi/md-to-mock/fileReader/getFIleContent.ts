import { readFileSync } from 'fs';
import marked from 'marked';

/** 
 * @description 获取文件内容
 * @returns 返回最终读取到的 mdAst
 */
export const getFIleContent = (entry: string) => {
  const md = readFileSync(entry, 'UTF8');
  const mdAST = marked.lexer(md);

  return mdAST;
};