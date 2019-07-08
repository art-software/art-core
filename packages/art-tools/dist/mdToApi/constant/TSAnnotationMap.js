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
 * TS-AST中的一些标识符
 */
var TsAstIdentifier;
(function (TsAstIdentifier) {
    TsAstIdentifier.annotationType = 'TSTypeReference';
})(TsAstIdentifier = exports.TsAstIdentifier || (exports.TsAstIdentifier = {}));
