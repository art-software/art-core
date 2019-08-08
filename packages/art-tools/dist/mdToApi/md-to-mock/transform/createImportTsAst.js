"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flattenArray_1 = require("../../utils/flattenArray");
const MarkDown_1 = require("../../constant/MarkDown");
const MockConstant_1 = require("../../constant/MockConstant");
const objDeepCopy_1 = require("../../utils/objDeepCopy");
const importTsAstTpl_1 = require("../../template/importTsAstTpl");
const TSAnnotationMap_1 = require("../../constant/TSAnnotationMap");
const firstWordUpperCase_1 = require("../../utils/firstWordUpperCase");
exports.createImportControllerTsAst = (mdAstMockPart) => {
    const controllerImportValue = [];
    mdAstMockPart.forEach((apiData) => {
        const cells = flattenArray_1.flattenArray(apiData.detail.cells);
        cells.find((cell, index) => {
            if (cell === MarkDown_1.DetailTableMembers.requestMethod) {
                controllerImportValue.push(cells[index + 1]);
            }
        });
    });
    controllerImportValue.unshift(MockConstant_1.DEFAULT_IMPORT_VALUE);
    const uniqueValues = Array.from(new Set(controllerImportValue));
    return exports.createImportTsAst(uniqueValues, MockConstant_1.DEFAULT_IMPORT_PACKAGE);
};
exports.createImportTsAst = (valueName, sourceName, isDefault) => {
    const importAstTpl = objDeepCopy_1.objDeepCopy(importTsAstTpl_1.importTsAstTpl);
    const importValueType = isDefault ? TSAnnotationMap_1.ImportValueWay.default : TSAnnotationMap_1.ImportValueWay.value;
    const importedValues = valueName.map((value) => {
        const singleImportValue = objDeepCopy_1.objDeepCopy(importAstTpl.specifiers[0]);
        singleImportValue.type = importValueType;
        singleImportValue.imported.name = firstWordUpperCase_1.firstWordUpperCase(value.toLowerCase());
        return singleImportValue;
    });
    importAstTpl.source.value = sourceName;
    importAstTpl.source.extra.rawValue = sourceName;
    importAstTpl.source.extra.raw = `'${sourceName}'`;
    importAstTpl.specifiers = importedValues;
    return importAstTpl;
};
