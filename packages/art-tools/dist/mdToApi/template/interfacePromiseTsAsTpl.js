"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interfacePromiseAstTpl = {
    type: 'ExportNamedDeclaration',
    declaration: {
        type: 'TSInterfaceDeclaration',
        id: {
            type: 'Identifier',
            name: '' // interface name
        },
        body: {
            type: 'TSInterfaceBody',
            body: [
                {
                    type: 'TSMethodSignature',
                    key: {
                        type: 'Identifier',
                        name: '' // every key name, nearly same as every interface name
                    },
                    parameters: [
                        // methods params array
                        {
                            type: 'Identifier',
                            name: '',
                            typeAnnotation: {
                                type: 'TSTypeAnnotation',
                                typeAnnotation: {
                                    type: '',
                                    typeName: {
                                        type: 'Identifier',
                                        name: '' // enum name
                                    }
                                }
                            }
                        }
                    ],
                    typeAnnotation: {
                        type: 'TSTypeAnnotation',
                        typeAnnotation: {
                            type: 'TSTypeReference',
                            typeName: {
                                type: 'Identifier',
                                name: 'Promise'
                            },
                            typeParameters: {
                                type: 'TSTypeParameterInstantiation',
                                params: [
                                    {
                                        type: 'TSTypeReference',
                                        typeName: {
                                            type: 'Identifier',
                                            name: 'AjaxResult'
                                        },
                                        typeParameters: {
                                            type: 'TSTypeParameterInstantiation',
                                            params: [
                                                {
                                                    type: 'TSTypeReference',
                                                    typeName: {
                                                        type: 'Identifier',
                                                        name: '' // every interface name
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }
    }
};
