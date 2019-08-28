"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = __importStar(require("path"));
const recast_1 = __importDefault(require("recast"));
const mkdirsSync_1 = require("../../utils/mkdirsSync");
const integrateTsAst_1 = require("../transform/integrateTsAst");
/**
 * @description 将最终生成 TsAst 写入进文件
 * @param {Object} ast 最终的 TsAst
 */
exports.appendToFile = (ast, output) => {
    try {
        if (mkdirsSync_1.mkdirsSync(path.dirname(output))) {
            fs_1.writeFileSync(output, `\n${recast_1.default.print(ast).code}`, 'utf8');
            integrateTsAst_1.clearAstMemory();
        }
    }
    catch (err) {
        console.log('err', err);
    }
};
