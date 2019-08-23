/** 
 * @description 去除特殊符号
 * @param {String} source 需要处理的字符串
 * @example objDeepCopy('aaxas-f_asd')
 */
export const removeSymbol: (source: string) => string = (source) => {
  const formatStr: string = source.replace(/[&\|\\_*^%$#@\-]/g, '');
  return formatStr;
};
