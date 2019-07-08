/** 
 * 对应markdown的explain的type映射到interface body的type定义
 */
export enum TypeAnnotations {
  int = 'TSNumberKeyword',
  number = 'TSNumberKeyword',
  float = 'TSNumberKeyword',
  string = 'TSStringKeyword',
  boolean = 'TSBooleanKeyword',
  array = 'TSArrayType',
  object = 'TSTypeReference'
}

/** 
 * 定义了enum的value值对应的类型
 */
export enum EnumTypeAnnotations {
  number = 'NumericLiteral',
  string = 'StringLiteral'
}

/** 
 * enum每条生成所需内容定义
 */
export interface ISingleEnumAst {
  currentName: string;
  rename?: string;
  type: string;
  option: string;
}

/** 
 * TS-AST中的一些标识符
 */
export namespace TsAstIdentifier {
  export const annotationType = 'TSTypeReference';
}