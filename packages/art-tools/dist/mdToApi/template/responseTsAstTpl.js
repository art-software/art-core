"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTsAstTpl = {
    type: 'ExportNamedDeclaration',
    declaration: {
        type: 'TSInterfaceDeclaration',
        id: {
            type: 'Identifier',
            name: 'AjaxResult'
        },
        typeParameters: {
            type: 'TSTypeParameterDeclaration',
            params: [
                {
                    type: 'TSTypeParameter',
                    name: 'T'
                }
            ]
        },
        body: {
            type: 'TSInterfaceBody',
            body: [
                {
                    type: 'TSPropertySignature',
                    key: {
                        type: 'Identifier',
                        name: 'code'
                    },
                    typeAnnotation: {
                        type: 'TSTypeAnnotation',
                        typeAnnotation: {
                            type: 'TSNumberKeyword'
                        }
                    }
                },
                {
                    type: 'TSPropertySignature',
                    key: {
                        type: 'Identifier',
                        name: 'msg'
                    },
                    typeAnnotation: {
                        type: 'TSTypeAnnotation',
                        typeAnnotation: {
                            type: 'TSStringKeyword'
                        }
                    }
                },
                {
                    type: 'TSPropertySignature',
                    key: {
                        type: 'Identifier',
                        name: 'data'
                    },
                    typeAnnotation: {
                        type: 'TSTypeAnnotation',
                        typeAnnotation: {
                            type: 'TSTypeReference',
                            typeName: {
                                type: 'Identifier',
                                name: 'T'
                            }
                        }
                    }
                }
            ]
        }
    }
};
