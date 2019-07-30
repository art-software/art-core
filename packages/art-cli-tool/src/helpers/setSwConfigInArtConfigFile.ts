import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import { Identifier, Property, Node, ExpressionStatement, VariableDeclarator } from 'ast-types/gen/nodes';
import escodegen from 'escodegen';
const esprima = require('esprima');

enum supportTypes {
  VariableDeclarator = 'VariableDeclarator',
  Property = 'Property'
}

const getAstNodesByName = (astRootNode: Node, nodeType: supportTypes, nodeName: string) => {
  const types = [supportTypes.VariableDeclarator, supportTypes.Property];
  if (types.indexOf(nodeType) === -1) {
    console.log(chalk.red('  Not support this type yet, expand by yourself please.'));
    return [];
  }

  const result: any[] = [];
  let currentDeepNodes = [astRootNode];
  let nextDeepNodes: any[] = [];

  const visit = (nodes) => {
    while (nodes.length > 0) {
      const node = nodes.shift();
      if (node === null || node === undefined) { return; }
      if (node.type === 'Program') {
        nextDeepNodes.push(...node.body);
      } else if (node.type === 'VariableDeclaration') {
        nextDeepNodes.push(...node.declarations);
      } else if (node.type === 'VariableDeclarator') {
        if (node.type === nodeType && node.id.name === nodeName) {
          result.push(node);
        }
        nextDeepNodes.push(node.init);
      } else if (node.type === 'ObjectExpression') {
        nextDeepNodes.push(...node.properties);
      } else if (node.type === 'Property') {
        if (node.type === nodeType && node.key.name === nodeName) {
          result.push(node);
        }
        nextDeepNodes.push(node.value);
      }
    }
    if (nextDeepNodes.length === 0) { return; }
    currentDeepNodes = nextDeepNodes;
    nextDeepNodes = [];
    visit(currentDeepNodes);
  };

  visit(currentDeepNodes);
  return result;
};

const setSwConfigInArtConfigFile = () => {
  const artConfigFilePath = path.resolve(process.cwd(), 'art.config.js');

  fs.readFile(artConfigFilePath)
    .then((contents) => {
      const sourceCode = contents.toString();
      let ast = esprima.parseModule(sourceCode, { range: true, tokens: true, comment: true });

      // 修改 dll.vendors
      const dllProperties: Property[] = getAstNodesByName(ast, supportTypes.Property, 'dll');
      dllProperties.forEach((property: Property) => {
        if (property.value.type === 'ObjectExpression') {
          const subProperties = property.value.properties as Property[];
          if ((subProperties[1].key as Identifier).name === 'vendors') {
            const originalVendorsAst = subProperties[1];
            // tslint:disable-next-line:no-eval
            const originalVendors: string[] = eval(`(${escodegen.generate(originalVendorsAst.value)})`);
            const vendors = [
              'polyfills',
              'react',
              'react-dom',
              'react-router-dom',
              'classnames',
              'axios',
              'workbox-window',
              'art-lib-react/src/components/scroll/lib/iscroll-probe'
            ];
            const newVendors = [...new Set(originalVendors.concat(vendors))];
            const vendorsAst = esprima.parseScript(JSON.stringify(newVendors), { range: true });
            originalVendorsAst.value = (vendorsAst.body[0] as ExpressionStatement).expression;
          }
        }
      });

      // 添加 service worker config
      const artConfigVariableDeclarators: VariableDeclarator[] = getAstNodesByName(ast, supportTypes.VariableDeclarator, 'artConfig');
      artConfigVariableDeclarators.forEach((variableDeclarator) => {
        const init = variableDeclarator.init;
        if (init && init.type === 'ObjectExpression') {
          const swProperties = getAstNodesByName(init, supportTypes.Property, 'sw');
          if (swProperties.length > 0) { return; }
          const swConfig = `{
            sw: {
              enable: true,
              includeModules: [], // 需要使用service worker的模块
              workboxOutputDirectory: 'workbox', // 存放service worker相关文件的目录名
              workboxGenerateSWOptions: {
                runtimeCaching: [
                  {
                    urlPattern: /art_framework\\.\\w+\\.js$/,
                    handler: 'CacheFirst',
                    options: {
                      cacheName: 'vendors-runtime-cache',
                      expiration: {
                        maxEntries: 2,
                        maxAgeSeconds: 15 * 24 * 60 * 60
                      }
                    }
                  }
                ]
              }
            }
          }`;
          const swConfigAst = esprima.parseScript(`const swConfig = ${swConfig}`, { range: true });
          const swConfigProperty = swConfigAst.body[0].declarations[0].init.properties[0];
          init.properties.push(swConfigProperty);
        }
      });

      ast = escodegen.attachComments(ast, ast.comments, ast.tokens); // 添加的代码解析成AST时需要将range设置为true，否则此处会报错
      const targetCode = escodegen.generate(ast, { comment: true, format: { indent: { style: '  ' } } });

      fs.writeFile(artConfigFilePath, targetCode).then(() => {
        console.log(chalk.green('  Modify art.config.js file finished!'));
      });
    });
};

export default setSwConfigInArtConfigFile;