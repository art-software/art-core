"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const classBodyTsAstTpl_1 = require("../../template/classBodyTsAstTpl");
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const MarkDown_1 = require("../../constant/MarkDown");
const flattenArray_1 = require("../../utils/flattenArray");
const createDecoratorTsAst_1 = require("./createDecoratorTsAst");
const firstWordUpperCase_1 = require("../../utils/firstWordUpperCase");
const createMethodBodyTsAst_1 = require("./createMethodBodyTsAst");
const toCamelCase_1 = require("../../utils/toCamelCase");
const firstWordLowerCase_1 = require("../../utils/firstWordLowerCase");
exports.createClassBodyTsAst = (mdAstMockPart) => {
    const classBodyTsAst = objDeepCopy_1.objDeepCopy(classBodyTsAstTpl_1.classBodyTsAstTpl);
    mdAstMockPart.forEach((apiInfo) => {
        const detailCells = flattenArray_1.flattenArray(apiInfo.detail.cells);
        let requestMethod = '';
        let requestUrl = '';
        detailCells.forEach((cell, index) => {
            if (cell === MarkDown_1.DetailTableMembers.requestMethod) {
                requestMethod = detailCells[index + 1];
            }
            if (cell === MarkDown_1.DetailTableMembers.requestUrl) {
                requestUrl = detailCells[index + 1];
            }
        });
        const classMethodTsAst = objDeepCopy_1.objDeepCopy(classBodyTsAstTpl_1.classMethodTsAstTpl);
        classMethodTsAst.type = TSAnnotationMap_1.ClassBodyType.method;
        classMethodTsAst.accessibility = TSAnnotationMap_1.ClassPrototypeAccessibility.public;
        classMethodTsAst.kind = TSAnnotationMap_1.PrototypeKindType.method;
        classMethodTsAst.key.name = firstWordLowerCase_1.firstWordLowerCase(toCamelCase_1.toCamelCase(toCamelCase_1.toCamelCase(requestUrl, '-')));
        classMethodTsAst.decorators.push(createDecoratorTsAst_1.createDecoratorTsAst(requestUrl, firstWordUpperCase_1.firstWordUpperCase(requestMethod.toLowerCase())));
        classMethodTsAst.body = createMethodBodyTsAst_1.createMethodBodyTsAst(apiInfo.example);
        classBodyTsAst.body.push(classMethodTsAst);
    });
    return classBodyTsAst;
};
