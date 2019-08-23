"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportInterfaceAstTpl = {
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
                    type: 'TSPropertySignature',
                    key: {
                        type: 'Identifier',
                        name: '' // every key name
                    },
                    optional: false,
                    typeAnnotation: {
                        type: 'TSTypeAnnotation',
                        typeAnnotation: {
                            type: '',
                            elementType: {
                                type: 'TSTypeReference',
                                typeName: {
                                    type: 'Identifier',
                                    name: '' // array interface anntation name
                                }
                            },
                            typeName: {
                                type: 'Identifier',
                                name: '' // obj interface anntation name
                            }
                        }
                    }
                }
            ]
        }
    }
};
