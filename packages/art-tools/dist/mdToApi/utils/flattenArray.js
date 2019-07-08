"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 数组扁平化
 * @param {Array} arr 需要扁平的数组
 * @example findAllIndex(['a', 'c'], ['a', 'd', 'c']) return [0, 2]
 */
exports.flattenArray = (arr) => {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? exports.flattenArray(next) : next);
    }, []);
};
