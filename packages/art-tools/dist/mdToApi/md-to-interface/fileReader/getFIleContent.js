"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const marked_1 = __importDefault(require("marked"));
/**
 * @description 获取文件内容
 * @returns 返回最终读取到的 mdAst
 */
exports.getFIleContent = (entry) => {
    const md = fs_1.readFileSync(entry, 'UTF8');
    const mdAST = marked_1.default.lexer(md);
    return mdAST;
};
