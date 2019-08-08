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
 * 定义对应import的方式 default or value
 */
export enum ImportValueWay {
  value = 'ImportSpecifier',
  default = 'ImportDefaultSpecifier'
}

/** 
 * 导出声明类型的配置 
 */
export enum ExportDeclarationType {
  class = 'ClassDeclaration'
}

/**
 * class声明body元素的类型
 */
export enum ClassBodyType {
  method = 'ClassMethod'
}

/** 
 * 对应属性的可访问属性
 */
export enum ClassPrototypeAccessibility {
  public = 'public',
  private = 'private'
}

/** 
 * 对应属性类型
 */
export enum PrototypeKindType {
  method = 'method'
}

/** 
 * 
 */
export enum DataExpression {
  object = 'ObjectExpression'
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
