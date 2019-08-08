import { createInterfaceName } from './createInterfaceName';
import { createInterfaceBody } from './createInterfaceBody';
import { collateInterfaceAst } from './integrateTsAst';
import { HIGHEST_PARENT } from '../../constant/MarkDown';

/** 
 * @description 生成interface的方法
 * @param {Array} interfaceChunkGather 截取出的每一个interface的mdAST
 */
export const createInterfaceTsAst = (interfaceChunkGather: any) => {
  interfaceChunkGather.forEach((value) => {
    const interfaceName = createInterfaceName((value).detail);
    const interfaceBody = createInterfaceBody((value).explain, HIGHEST_PARENT);
    collateInterfaceAst(interfaceName, interfaceBody);
  });
};