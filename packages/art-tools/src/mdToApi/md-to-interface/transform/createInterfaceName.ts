import { flattenArray } from '../../utils/flattenArray';
import { toCameCase } from '../../utils/toCameCase';
import { DetailTableMembers, INTERFACE_NAME_PREFIX } from '../../constant/MarkDown';
import paths from '../../../common/config/paths';
const artConfig = require(paths.appArtConfig);

/** 
 * @description 生成最终的一个interface名字
 * @param detailTable api的detail表格块
 */
export const createInterfaceName = (detailTable: any) => {
  const isRemoveMDToApiBegin = artConfig.isRemoveMDToApiBegin || false;
  let resultStr: string = '';
  let urlStr: string = '';
  const tableCells = flattenArray(detailTable.cells);
  tableCells.find((value, index) => {
    if (value === DetailTableMembers.requestUrl) {
      urlStr = tableCells[index + 1];
    }
  });
  urlStr = isRemoveMDToApiBegin ? urlStr.replace(/\/\w+/, '') : urlStr;
  resultStr = INTERFACE_NAME_PREFIX + toCameCase(toCameCase(urlStr, '/'), '-');
  return resultStr;
};