// 入口文件
import { readMdFile } from './fileReader';
import { extractNeedTransformData } from './extractor';
import { createMockTsAst } from './transform';
import { appendToFile } from './generator';

/** 
 * @description 生成需要的interface方法
 * 1- 读取 md
 * 2- 抽离需要的 md 内容
 * 3- 转换为 TS-AST
 * 4- 写入内容
 */
export const parseMdToMock = (entry: string, output: string, moduleName: string) => {
  const mdAST = readMdFile(entry);
  const transformData =  extractNeedTransformData(mdAST);
  const interfaceAST = createMockTsAst(transformData, output, moduleName);
  appendToFile(interfaceAST, output);
};
