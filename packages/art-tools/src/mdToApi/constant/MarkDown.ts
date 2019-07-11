// md 规定的表格 头
export namespace MarkDownHeaders {
  export const DETAIL = 'detail';
  export const PARAMS = 'params';
  export const EXPLAIN = 'explain';
  export const EXAMPLE = 'example';
}

// md 规定的 explain 表格 列
export namespace ExplainTableHeader {
  export const paramsName = '参数名';
  export const type = '类型';
  export const parents = 'parents';
  export const explain = '说明';
  export const example = '示例';
  export const valueOptions = '值选项';
  export const rename = 'rename';
}

// md 规定的 params 表格 列
export namespace ParamsTableHeader {
  export const paramsName = '参数名';
  export const type = '类型';
  export const explain = '说明';
  export const example = '示例';
  export const valueOptions = '值选项';
  export const rename = 'rename';
}

// md 规定的 detail 表格 拥有成员
export namespace DetailTableMembers {
  export const requestMethod = 'request-method';
  export const requestUrl = 'request-url';
}

// md 的一些特殊标识符
export namespace MarkDownIdentifier {
  export const singleInterfaceStart = 'list_start';
  export const headerIdentifier = 'heading';
  export const tableIdentifier = 'table';
}

// 参数对应类型
export namespace ParamType {
  export const number = 'int';
  export const string = 'string';
  export const boolean = 'boolean';
  export const array = 'array';
  export const object = 'object';
}

export enum MdToJsTypeMap {
  int = 'number',
  number = 'number',
  float = 'number',
  string = 'string',
  boolean = 'boolean',
  array = 'array',
  object = 'object'
}

// md 规定的每个表格header的标题等级
export const TAbLE_HEADER_DEPTH = 4;

// 定义了数据格式中的最高父级
export const HIGHEST_PARENT = 'data';

// 返回的interfaceName后缀
export const RESPONSE_NAME_SUFFIX = 'Service';

// interface的标示前缀
export const INTERFACE_NAME_PREFIX = 'I';

// md 规定定义参数多种选项固定值，以:为区分含义和内容  large: 1, small: 2
export const ENUM_VALUE_DECOLLATOR = ':';