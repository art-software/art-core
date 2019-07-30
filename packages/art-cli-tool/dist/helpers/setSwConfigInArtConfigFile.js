"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const escodegen_1 = __importDefault(require("escodegen"));
const esprima = require('esprima');
var supportTypes;
(function (supportTypes) {
    supportTypes["VariableDeclarator"] = "VariableDeclarator";
    supportTypes["Property"] = "Property";
})(supportTypes || (supportTypes = {}));
const getAstNodesByName = (astRootNode, nodeType, nodeName) => {
    const types = [supportTypes.VariableDeclarator, supportTypes.Property];
    if (types.indexOf(nodeType) === -1) {
        console.log(chalk_1.default.red('  Not support this type yet, expand by yourself please.'));
        return [];
    }
    const result = [];
    let currentDeepNodes = [astRootNode];
    let nextDeepNodes = [];
    const visit = (nodes) => {
        while (nodes.length > 0) {
            const node = nodes.shift();
            if (node === null || node === undefined) {
                return;
            }
            if (node.type === 'Program') {
                nextDeepNodes.push(...node.body);
            }
            else if (node.type === 'VariableDeclaration') {
                nextDeepNodes.push(...node.declarations);
            }
            else if (node.type === 'VariableDeclarator') {
                if (node.type === nodeType && node.id.name === nodeName) {
                    result.push(node);
                }
                nextDeepNodes.push(node.init);
            }
            else if (node.type === 'ObjectExpression') {
                nextDeepNodes.push(...node.properties);
            }
            else if (node.type === 'Property') {
                if (node.type === nodeType && node.key.name === nodeName) {
                    result.push(node);
                }
                nextDeepNodes.push(node.value);
            }
        }
        if (nextDeepNodes.length === 0) {
            return;
        }
        currentDeepNodes = nextDeepNodes;
        nextDeepNodes = [];
        visit(currentDeepNodes);
    };
    visit(currentDeepNodes);
    return result;
};
const setSwConfigInArtConfigFile = () => {
    const artConfigFilePath = path_1.default.resolve(process.cwd(), 'art.config.js');
    fs_extra_1.default.readFile(artConfigFilePath)
        .then((contents) => {
        const sourceCode = contents.toString();
        let ast = esprima.parseModule(sourceCode, { range: true, tokens: true, comment: true });
        // 修改 dll.vendors
        const dllProperties = getAstNodesByName(ast, supportTypes.Property, 'dll');
        dllProperties.forEach((property) => {
            if (property.value.type === 'ObjectExpression') {
                const subProperties = property.value.properties;
                if (subProperties[1].key.name === 'vendors') {
                    const originalVendorsAst = subProperties[1];
                    // tslint:disable-next-line:no-eval
                    const originalVendors = eval(`(${escodegen_1.default.generate(originalVendorsAst.value)})`);
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
                    originalVendorsAst.value = vendorsAst.body[0].expression;
                }
            }
        });
        // 添加 service worker config
        const artConfigVariableDeclarators = getAstNodesByName(ast, supportTypes.VariableDeclarator, 'artConfig');
        artConfigVariableDeclarators.forEach((variableDeclarator) => {
            const init = variableDeclarator.init;
            if (init && init.type === 'ObjectExpression') {
                const swProperties = getAstNodesByName(init, supportTypes.Property, 'sw');
                if (swProperties.length > 0) {
                    return;
                }
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
        ast = escodegen_1.default.attachComments(ast, ast.comments, ast.tokens); // 添加的代码解析成AST时需要将range设置为true，否则此处会报错
        const targetCode = escodegen_1.default.generate(ast, { comment: true, format: { indent: { style: '  ' } } });
        fs_extra_1.default.writeFile(artConfigFilePath, targetCode).then(() => {
            console.log(chalk_1.default.green('  Modify art.config.js file finished!'));
        });
    });
};
exports.default = setSwConfigInArtConfigFile;
