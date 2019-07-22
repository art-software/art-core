import path from 'path';
import { createDecoratorTsAst } from './createDecoratorTsAst';
import { objDeepCopy } from '../../utils/objDeepCopy';
import { exportTsAstTpl } from '../../template/exportTsAstTpl';
import { ExportDeclarationType } from '../../constant/TSAnnotationMap';
import { createClassBodyTsAst } from './createClassBodyTsAst';

export const createClassTsAst = (mdAstMockPart, output) => {
  const exportClassTsAst = objDeepCopy(exportTsAstTpl);
  exportClassTsAst.declaration.type = ExportDeclarationType.class;
  exportClassTsAst.declaration.decorators.push(createDecoratorTsAst('/home'));
  exportClassTsAst.declaration.id.name = path.basename(output).split('.')[0];
  exportClassTsAst.declaration.body = createClassBodyTsAst(mdAstMockPart);
  return exportClassTsAst;
};