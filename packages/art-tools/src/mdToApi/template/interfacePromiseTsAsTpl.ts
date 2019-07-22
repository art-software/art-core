export const interfacePromiseAstTpl = {
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
          type: 'TSMethodSignature', // is a method
          key: {
            type: 'Identifier',
            name: '' // every key name, nearly same as every interface name
          },
          parameters: [
            // methods params array
            {
              type: 'Identifier',
              name: '', // every params key
              typeAnnotation: {
                type: 'TSTypeAnnotation',
                typeAnnotation: {
                  type: '', // every params annotation
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
              type: 'TSTypeReference', // annotation type
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
