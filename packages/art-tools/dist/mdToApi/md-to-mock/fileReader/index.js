"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFIleContent_1 = require("./getFIleContent");
/**
 * @description 读取文件
 */
exports.readMdFile = (entry) => {
    return getFIleContent_1.getFIleContent(entry);
};
