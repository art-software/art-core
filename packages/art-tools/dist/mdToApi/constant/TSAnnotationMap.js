"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对应markdown的explain的type映射到interface body的type定义
 */
var TypeAnnotations;
(function (TypeAnnotations) {
    TypeAnnotations["int"] = "TSNumberKeyword";
    TypeAnnotations["number"] = "TSNumberKeyword";
    TypeAnnotations["float"] = "TSNumberKeyword";
    TypeAnnotations["string"] = "TSStringKeyword";
    TypeAnnotations["boolean"] = "TSBooleanKeyword";
    TypeAnnotations["array"] = "TSArrayType";
    TypeAnnotations["object"] = "TSTypeReference";
})(TypeAnnotations = exports.TypeAnnotations || (exports.TypeAnnotations = {}));
/**
 * 定义了enum的value值对应的类型
 */
var EnumTypeAnnotations;
(function (EnumTypeAnnotations) {
    EnumTypeAnnotations["number"] = "NumericLiteral";
    EnumTypeAnnotations["string"] = "StringLiteral";
})(EnumTypeAnnotations = exports.EnumTypeAnnotations || (exports.EnumTypeAnnotations = {}));
/**
 * 定义对应import的方式 default or value
 */
var ImportValueWay;
(function (ImportValueWay) {
    ImportValueWay["value"] = "ImportSpecifier";
    ImportValueWay["default"] = "ImportDefaultSpecifier";
})(ImportValueWay = exports.ImportValueWay || (exports.ImportValueWay = {}));
/**
 * 导出声明类型的配置
 */
var ExportDeclarationType;
(function (ExportDeclarationType) {
    ExportDeclarationType["class"] = "ClassDeclaration";
})(ExportDeclarationType = exports.ExportDeclarationType || (exports.ExportDeclarationType = {}));
/**
 * class声明body元素的类型
 */
var ClassBodyType;
(function (ClassBodyType) {
    ClassBodyType["method"] = "ClassMethod";
})(ClassBodyType = exports.ClassBodyType || (exports.ClassBodyType = {}));
/**
 * 对应属性的可访问属性
 */
var ClassPrototypeAccessibility;
(function (ClassPrototypeAccessibility) {
    ClassPrototypeAccessibility["public"] = "public";
    ClassPrototypeAccessibility["private"] = "private";
})(ClassPrototypeAccessibility = exports.ClassPrototypeAccessibility || (exports.ClassPrototypeAccessibility = {}));
/**
 * 对应属性类型
 */
var PrototypeKindType;
(function (PrototypeKindType) {
    PrototypeKindType["method"] = "method";
})(PrototypeKindType = exports.PrototypeKindType || (exports.PrototypeKindType = {}));
/**
 *
 */
var DataExpression;
(function (DataExpression) {
    DataExpression["object"] = "ObjectExpression";
})(DataExpression = exports.DataExpression || (exports.DataExpression = {}));
/**
 * TS-AST中的一些标识符
 */
var TsAstIdentifier;
(function (TsAstIdentifier) {
    TsAstIdentifier.annotationType = 'TSTypeReference';
})(TsAstIdentifier = exports.TsAstIdentifier || (exports.TsAstIdentifier = {}));
