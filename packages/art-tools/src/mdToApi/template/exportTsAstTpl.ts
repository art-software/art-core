export const exportTsAstTpl = {
  type: 'ExportDefaultDeclaration', // export type. defauly use 'ExportDefaultDeclaration', name use 'ExportNameDeclaration'
  declaration: {
    type: '', // declara a class use 'ClassDeclaration'
    decorators: [], // class decorators
    id: {
      type: 'Identifier',
      name: '' // export name
    },
    body: {}, // if class will has body, such as method
    // superClass: null,
    // typeParameters: null,
    // superTypeParameters: null
  }
};