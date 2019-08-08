"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 字符串首字母小写
 * @param {String} str 需要转换的字符串
 * @example firstWordLowerCase('AsD') return asD
 */
exports.firstWordLowerCase = (str) => {
    return str.replace(/(\s|^)[A-Z]/g, (char) => {
        return char.toLowerCase();
    });
};
