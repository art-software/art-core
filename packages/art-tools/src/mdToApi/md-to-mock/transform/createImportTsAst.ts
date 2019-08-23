import { flattenArray } from '../../utils/flattenArray';
import { DetailTableMembers } from '../../constant/MarkDown';
import { DEFAULT_IMPORT_PACKAGE, DEFAULT_IMPORT_VALUE } from '../../constant/MockConstant';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { importTsAstTpl } from '../../template/importTsAstTpl';
import { ImportValueWay } from '../../constant/TSAnnotationMap';
import { firstWordUpperCase } from '../../utils/firstWordUpperCase';

export const createImportControllerTsAst = (mdAstMockPart) => {
  const controllerImportValue: string[] = [];
  mdAstMockPart.forEach((apiData) => {
    const cells = flattenArray(apiData.detail.cells);
    cells.find((cell, index) => {
      if (cell === DetailTableMembers.requestMethod) {
        controllerImportValue.push(cells[index + 1]);
      }
    });
  });
  controllerImportValue.unshift(DEFAULT_IMPORT_VALUE);
  const uniqueValues: string[] = Array.from(new Set(controllerImportValue));
  return createImportTsAst(uniqueValues, DEFAULT_IMPORT_PACKAGE);
};

export const createImportTsAst: (valueName: string[], sourceName: string, isDefault?: boolean) => any =
  (valueName, sourceName, isDefault) => {
    const importAstTpl = objDeepCopy(importTsAstTpl);
    const importValueType = isDefault ? ImportValueWay.default : ImportValueWay.value;
    const importedValues = valueName.map((value) => {
      const singleImportValue = objDeepCopy(importAstTpl.specifiers[0]);
      singleImportValue.type = importValueType;
      singleImportValue.imported.name = firstWordUpperCase(value.toLowerCase());
      return singleImportValue;
    });
    importAstTpl.source.value = sourceName;
    importAstTpl.source.extra.rawValue = sourceName;
    importAstTpl.source.extra.raw = `'${sourceName}'`;
    importAstTpl.specifiers = importedValues;
    return importAstTpl;
  };