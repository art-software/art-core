"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 深拷贝
 * @param {Object|Array} source 需要拷贝的对象
 * @example objDeepCopy({age: 18})
 */
exports.objDeepCopy = (source) => {
    const sourceCopy = source instanceof Array ? [] : {};
    for (const item in source) {
        sourceCopy[item] =
            typeof source[item] === 'object' && source[item] !== null
                ? exports.objDeepCopy(source[item])
                : source[item];
    }
    return sourceCopy;
};
