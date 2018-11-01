/**
 * YYYY：4位年,如1993
 * YY：2位年,如93
 * MM：月份
 * DD：日期
 * hh：小时
 * mm：分钟
 * ss：秒钟
 * 星期：星期, 返回如 星期二
 * 周：返回如 周二
 * week：英文星期全称, 返回如 Saturday
 * www：三位英文星期, 返回如 Sat
 * @param  {Date|String|Number} date   The Date instance(optional)
 * @param  {String}      format Date format string. YYYY-MM-DD
 * @return {String}             Formatted string.
 */
export declare const formatDate: (date: any, format?: any) => any;
/**
 * 日期的加减法
 *
 * @param {String} interval 字符串表达式，表示要添加的时间间隔.
 * @param {Number} number 数值表达式，表示要添加的时间间隔的个数.
 * @param {Date} date 时间对象.
 * @return {Date} 新的时间对象.
 */
export declare const dateAdd: (interval: any, number: any, date: any) => any;
/**
 * 计算还剩余多少时间 Note. format(hh时mm分ss秒)is required.
 * @param {Number|String} seconds 20000
 * @param {String} format YYYY年MM月DD日 hh时mm分ss秒
 * @param {String} prefix 剩余
 * @returns {String} 剩余23时58分
 */
export declare const formatTimestamp: (seconds: any, format: any, prefix: any) => any;
