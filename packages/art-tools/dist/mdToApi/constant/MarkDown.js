"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// md 规定的表格 头
var MarkDownHeaders;
(function (MarkDownHeaders) {
    MarkDownHeaders.DETAIL = 'detail';
    MarkDownHeaders.PARAMS = 'params';
    MarkDownHeaders.EXPLAIN = 'explain';
    MarkDownHeaders.EXAMPLE = 'example';
})(MarkDownHeaders = exports.MarkDownHeaders || (exports.MarkDownHeaders = {}));
// md 规定的 explain 表格 列
var ExplainTableHeader;
(function (ExplainTableHeader) {
    ExplainTableHeader.paramsName = '参数名';
    ExplainTableHeader.type = '类型';
    ExplainTableHeader.parents = 'parents';
    ExplainTableHeader.explain = '说明';
    ExplainTableHeader.example = '示例';
    ExplainTableHeader.valueOptions = '值选项';
    ExplainTableHeader.rename = 'rename';
})(ExplainTableHeader = exports.ExplainTableHeader || (exports.ExplainTableHeader = {}));
// md 规定的 params 表格 列
var ParamsTableHeader;
(function (ParamsTableHeader) {
    ParamsTableHeader.paramsName = '参数名';
    ParamsTableHeader.type = '类型';
    ParamsTableHeader.explain = '说明';
    ParamsTableHeader.example = '示例';
    ParamsTableHeader.valueOptions = '值选项';
    ParamsTableHeader.rename = 'rename';
})(ParamsTableHeader = exports.ParamsTableHeader || (exports.ParamsTableHeader = {}));
// md 规定的 detail 表格 拥有成员
var DetailTableMembers;
(function (DetailTableMembers) {
    DetailTableMembers.requestMethod = 'request-method';
    DetailTableMembers.requestUrl = 'request-url';
})(DetailTableMembers = exports.DetailTableMembers || (exports.DetailTableMembers = {}));
// md 的一些特殊标识符
var MarkDownIdentifier;
(function (MarkDownIdentifier) {
    MarkDownIdentifier.singleInterfaceStart = 'list_start';
    MarkDownIdentifier.headerIdentifier = 'heading';
    MarkDownIdentifier.tableIdentifier = 'table';
})(MarkDownIdentifier = exports.MarkDownIdentifier || (exports.MarkDownIdentifier = {}));
// 参数对应类型
var ParamType;
(function (ParamType) {
    ParamType.number = 'int';
    ParamType.string = 'string';
    ParamType.boolean = 'boolean';
    ParamType.array = 'array';
    ParamType.object = 'object';
})(ParamType = exports.ParamType || (exports.ParamType = {}));
var MdToJsTypeMap;
(function (MdToJsTypeMap) {
    MdToJsTypeMap["int"] = "number";
    MdToJsTypeMap["number"] = "number";
    MdToJsTypeMap["float"] = "number";
    MdToJsTypeMap["string"] = "string";
    MdToJsTypeMap["boolean"] = "boolean";
    MdToJsTypeMap["array"] = "array";
    MdToJsTypeMap["object"] = "object";
})(MdToJsTypeMap = exports.MdToJsTypeMap || (exports.MdToJsTypeMap = {}));
// md 规定的每个表格header的标题等级
exports.TABLE_HEADER_DEPTH = 4;
// 定义了数据格式中的最高父级
exports.HIGHEST_PARENT = 'data';
// 返回的interfaceName后缀
exports.RESPONSE_NAME_SUFFIX = 'Service';
// interface的标示前缀
exports.INTERFACE_NAME_PREFIX = 'I';
// md 规定定义参数多种选项固定值，以:为区分含义和内容  large: 1, small: 2
exports.ENUM_VALUE_DECOLLATOR = ':';
