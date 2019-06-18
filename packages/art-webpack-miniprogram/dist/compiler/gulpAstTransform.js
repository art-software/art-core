"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const through2_1 = __importDefault(require("through2"));
const recast_1 = __importDefault(require("recast"));
const transform = (file, encoding, visitor) => {
    const inputSource = file.contents.toString(encoding);
    const ast = recast_1.default.parse(inputSource, {
        sourceFileName: file.relative,
        tokens: false,
        parser: require('recast/parsers/typescript')
    });
    recast_1.default.visit(ast, visitor);
    const output = recast_1.default.print(ast);
    file.contents = new Buffer(output.code);
};
exports.gulpAstTransform = (visitor, afterTransform) => {
    return through2_1.default.obj(function (file, encoding, callback) {
        // console.log(chalk.green('current file'), file.path);
        transform(file, encoding, visitor);
        if (afterTransform) {
            afterTransform();
        }
        callback(null, file);
    });
};
