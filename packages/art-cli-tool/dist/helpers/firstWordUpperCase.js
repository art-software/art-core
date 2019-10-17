"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 字符串首字母大写
 * @param {String} str 需要转换的字符串
 * @example firstWordUpperCase('asd') return Asd
 */
exports.firstWordUpperCase = (str) => {
    return str.replace(/(\s|^)[a-z]/g, (char) => {
        return char.toUpperCase();
    });
};
