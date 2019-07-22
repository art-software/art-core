/** 
 * @description 找到数组与目标数组相对的index值
 * @param {Array} findArr 查找的数组
 * @param {Array} TargetArr 目标母数组
 * @example findAllIndex(['a', 'c'], ['a', 'd', 'c']) return [0, 2]
 */
export const findAllIndex = (findArr, targetArr): number[] => {
  const indexGather: number[] = [];
  findArr.forEach((value) => {
    indexGather.push(targetArr.indexOf(value));
  });
  return indexGather;
};