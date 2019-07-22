"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const recast_1 = __importDefault(require("recast"));
/**
 * @description 将最终生成 TsAst 写入进文件
 * @param {Object} ast 最终的 TsAst
 */
exports.appendToFile = (ast, output) => {
    try {
        fs_1.writeFileSync(output, `${recast_1.default.print(ast, { tabWidth: 2 }).code.replace(/\"/g, `\'`)}`, 'utf8');
    }
    catch (err) {
        console.log('err:', err);
    }
};
