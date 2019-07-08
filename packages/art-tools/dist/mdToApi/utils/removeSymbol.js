"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 去除特殊符号
 * @param {String} source 需要处理的字符串
 * @example objDeepCopy('aaxas-f_asd')
 */
exports.removeSymbol = (source) => {
    const formatStr = source.replace(/[&\|\\_*^%$#@\-]/g, '');
    return formatStr;
};
