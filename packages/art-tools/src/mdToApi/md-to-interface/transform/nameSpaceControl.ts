/** 
 * 全局的名字记录，interface和enum都会保存其中
 */
export const nameSpaceGather: any = [];

/** 
 * @description 对全局名字是否重复进行判断并存储修改
 * @param {String} newName 进行判断的名字
 */
export const checkRepeatName = (newName: string) => {
  if (newName === '') { return ''; }
  const isRepeatName: boolean = Boolean(nameSpaceGather.filter((nameSpace) => {
    if (newName in nameSpace) {
      nameSpace[newName]++;
      newName += nameSpace[newName];
      return nameSpace;
    }
  }).length);
  if (!isRepeatName) {
    const newNameSpace = {};
    newNameSpace[newName] = 0;
    nameSpaceGather.push(newNameSpace);
  }
  return newName;
};