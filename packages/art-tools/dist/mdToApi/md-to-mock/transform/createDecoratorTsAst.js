"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const decoratorTsAstTpl_1 = require("../../template/decoratorTsAstTpl");
const MockConstant_1 = require("../../constant/MockConstant");
exports.createDecoratorTsAst = (params, decoratorName) => {
    const decoratorTsAst = objDeepCopy_1.objDeepCopy(decoratorTsAstTpl_1.decoratorTsAstTpl);
    decoratorName = decoratorName || MockConstant_1.DEFAULT_IMPORT_VALUE;
    decoratorTsAst.callee.callee.name = decoratorName;
    decoratorTsAst.callee.arguments[0].value = `${params}`;
    decoratorTsAst.callee.arguments[0].extra.rawValue = `${params}`;
    decoratorTsAst.callee.arguments[0].extra.raw = `${params}`;
    decoratorTsAst.expression = `${decoratorName}('${params}')`;
    return decoratorTsAst;
};
