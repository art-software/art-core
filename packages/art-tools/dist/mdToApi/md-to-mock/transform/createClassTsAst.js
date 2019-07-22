"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const createDecoratorTsAst_1 = require("./createDecoratorTsAst");
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const exportTsAstTpl_1 = require("../../template/exportTsAstTpl");
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const createClassBodyTsAst_1 = require("./createClassBodyTsAst");
exports.createClassTsAst = (mdAstMockPart, output) => {
    const exportClassTsAst = objDeepCopy_1.objDeepCopy(exportTsAstTpl_1.exportTsAstTpl);
    exportClassTsAst.declaration.type = TSAnnotationMap_1.ExportDeclarationType.class;
    exportClassTsAst.declaration.decorators.push(createDecoratorTsAst_1.createDecoratorTsAst('/home'));
    exportClassTsAst.declaration.id.name = path_1.default.basename(output).split('.')[0];
    exportClassTsAst.declaration.body = createClassBodyTsAst_1.createClassBodyTsAst(mdAstMockPart);
    return exportClassTsAst;
};
