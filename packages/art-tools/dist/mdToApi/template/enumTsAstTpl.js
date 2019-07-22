"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumAstTpl = {
    type: 'ExportNamedDeclaration',
    declaration: {
        type: 'TSEnumDeclaration',
        id: {
            type: 'Identifier',
            name: '' // enum name
        },
        members: [
            {
                type: 'TSEnumMember',
                id: {
                    type: 'Identifier',
                    name: ''
                },
                initializer: {
                    type: '',
                    value: '' // value
                }
            }
        ]
    }
};
