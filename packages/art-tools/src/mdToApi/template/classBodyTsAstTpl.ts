export const classBodyTsAstTpl = {
  type: 'ClassBody',
  body: []
};

export const classMethodTsAstTpl = {
  type: '', // method use 'ClassMethod'
  decorators: [],
  accessibility: '', // 'public' ? 'priavte'
  static: false, // is static
  key: {
    type: 'Identifier',
    name: '' // method name
  },
  kind: '', // prototype type, method use 'method'
  generator: false,
  async: false,
  params: [], // method may have
  body: {},
  optional: null,
  abstract: null,
  rest: null,
  returnType: null,
  typeParameters: null,
  defaults: []
  // expression: false
};