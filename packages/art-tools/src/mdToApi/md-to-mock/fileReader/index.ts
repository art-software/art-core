import { getFIleContent } from './getFIleContent';

/** 
 * @description 读取文件
 */
export const readMdFile: (entry: string) => void = (entry) => {
  return getFIleContent(entry);
};