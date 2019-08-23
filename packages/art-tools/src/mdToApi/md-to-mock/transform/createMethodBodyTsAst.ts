import { objDeepCopy } from '../../utils/objDeepCopy';
import { methodBodyTsAstTpl, methodBodyReturnTsAstTpl } from '../../template/methodBodyTsAstTpl';
import recast from 'recast';
import { DataExpression } from '../../constant/TSAnnotationMap';
import { removeJsonKeyQuotes } from '../../utils/removeJsonKeyQuotes';
const tsParser = require('recast/parsers/typescript');

export const createMethodBodyTsAst = (exampleInfo) => {
  const methodBodyTsAst = objDeepCopy(methodBodyTsAstTpl);
  const jsonBodyAst = recast.parse(`const test = ${removeJsonKeyQuotes(JSON.parse(exampleInfo.text))}`, {
    parser: tsParser
  }).program.body;
  const methodBody = jsonBodyAst[0].declarations[0].init.properties;
  const methodBodyReturnTsAst = objDeepCopy(methodBodyReturnTsAstTpl);
  methodBodyReturnTsAst.argument.properties = methodBody;
  methodBodyReturnTsAst.argument.type = DataExpression.object;
  methodBodyTsAst.body = [methodBodyReturnTsAst];
  return methodBodyTsAst;
};