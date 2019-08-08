/** 
 * @description 数组扁平化
 * @param {Array} arr 需要扁平的数组
 * @example findAllIndex(['a', 'c'], ['a', 'd', 'c']) return [0, 2]
 */
export const flattenArray = (arr) => {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flattenArray(next) : next);
  }, []);
};