import { flattenArray } from '../../utils/flattenArray';
import { toHump } from '../../utils/toHump';
import isCutOut from '../../art.config.js';
import { DetailTableMembers, INTERFACENAMEPREFIX } from '../../constant/MarkDown';

/** 
 * @description 生成最终的一个interface名字
 * @param detailTable api的detail表格块
 */
export const createInterfaceName = (detailTable: any) => {
  let resultStr: string = '';
  let urlStr: string = '';
  const tableCells = flattenArray(detailTable.cells);
  tableCells.find((value, index) => {
    if (value === DetailTableMembers.requestUrl) {
      urlStr = tableCells[index + 1];
    }
  });
  urlStr = isCutOut ? urlStr.replace(/\/\w+/, '') : urlStr;
  resultStr = INTERFACENAMEPREFIX + toHump(toHump(urlStr, '/'), '-');
  return resultStr;
};