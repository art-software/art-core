"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 找到数组与目标数组相对的index值
 * @param {Array} findArr 查找的数组
 * @param {Array} TargetArr 目标母数组
 * @example findAllIndex(['a', 'c'], ['a', 'd', 'c']) return [0, 2]
 */
exports.findAllIndex = (findArr, targetArr) => {
    const indexGather = [];
    findArr.forEach((value) => {
        indexGather.push(targetArr.indexOf(value));
    });
    return indexGather;
};
