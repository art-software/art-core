
export const decoratorTsAstTpl = {
  type: 'Decorator',
  callee: {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: '' // decorator name
    },
    arguments: [
      {
        type: 'StringLiteral', // string use 'StringLiteral' ? number? any other else
        extra: {
          rawValue: '',
          raw: ''
        },
        value: '' // param value
      }
    ]
  }
};