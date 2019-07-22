/** 
 * @description 以某元素转驼峰
 * @param {String} str 需要转换的字符串
 * @param {String} symbol 转换的元素
 * @example toHump('/asd/asd', '/') return AsdAsd
 */
export const toCamelCase = (str: string, symbol: string = '/'): string => {
  const reg = new RegExp(`\\${symbol}(\\w)`, 'g');
  return str.replace(reg, (all, letter) => {
      return letter.toUpperCase();
  });
};