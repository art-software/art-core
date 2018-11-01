/**
 * Note: precision不是保留的小数点后面的位数, 而是计算的精度
 * 如果需要获取计算值的保留小数位数请使用numberFormat()
 */
export declare const doDecimalSafeMath: (a: number, operation: string, b: number, precision?: number | undefined) => number;
/**
 * Addition
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 */
export declare const numAdd: (num1: number, num2: number, precision?: number | undefined) => number;
/**
 * subtraction
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 */
export declare const numSub: (num1: number, num2?: number, precision?: number | undefined) => number;
/**
 * multiplication
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 *
 */
export declare const numMulti: (num1: number, num2?: number, precision?: number | undefined) => number;
/**
 * division
 * @param {String|Number} num1
 * @param {String|Number} num2
 * @param {Number} precision
 * @return {Number}
 */
export declare const numDiv: (num1: number, num2?: number, precision?: number | undefined) => number;
export declare const amtToArr: (number: number, formatBit?: number | undefined) => any[];
/**
 * Formats a number with grouped thousands
 * @param {String|Number} number
 * @param {Number} decimals
 * @param {String} dec_point
 * @param {String} thousands_sep
 */
export declare const numberFormat: (number: number, decimals?: number, dec_point?: string, thousands_sep?: string, useRound?: boolean) => string;
