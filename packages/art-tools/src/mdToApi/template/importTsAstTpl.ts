export const importTsAstTpl =
{
  type: 'ImportDeclaration',
  specifiers: [
    {
      type: '', // import use value like: import { get } from 'xxxx' use ImportSpecifier, default use 'ImportDefaultSpecifier'
      imported: {
        type: 'Identifier',
        name: '', // import value name
        optional: false,
        typeAnnotation: null
      }
    }
  ],
  source: {
    type: 'StringLiteral',
    extra: {
      rawValue: '', // import subject
      raw: '' // import subject
    },
    value: '', // import subject
    // regex: null
  },
  // importKind: 'value'
};