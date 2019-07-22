import { objDeepCopy } from '../../utils/objDeepCopy';
import { decoratorTsAstTpl } from '../../template/decoratorTsAstTpl';
import { DEFAULT_IMPORT_VALUE } from '../../constant/MockConstant';

export const createDecoratorTsAst = (params: string, decoratorName?: string) => {
  const decoratorTsAst = objDeepCopy(decoratorTsAstTpl);
  decoratorName = decoratorName || DEFAULT_IMPORT_VALUE;
  decoratorTsAst.callee.callee.name = decoratorName;
  decoratorTsAst.callee.arguments[0].value = `${params}`;
  decoratorTsAst.callee.arguments[0].extra.rawValue = `${params}`;
  decoratorTsAst.callee.arguments[0].extra.raw = `${params}`;
  decoratorTsAst.expression = `${decoratorName}('${params}')`;
  return decoratorTsAst;
};