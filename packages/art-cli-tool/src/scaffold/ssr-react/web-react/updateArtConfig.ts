import { printInstructions } from '../../printLog';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { Property } from 'estree';
import escodegen from 'escodegen';
const esprima = require('esprima');
import replace from 'replace';

module.exports = function (scaffoldTo) {
  const scaffoldInstance = this;
  printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [art config] files...`);

  const defaultEntryAst = {
    type: 'Property',
    key: {
      type: 'TemplateLiteral',
      quasis: [
        {
          type: 'TemplateElement',
          value: {
            raw: '',
            cooked: ''
          },
          tail: false
        },
        {
          type: 'TemplateElement',
          value: {
            raw: '/replaceIt',
            cooked: '/replaceIt'
          },
          tail: true
        }
      ],
      expressions: [
        {
          type: 'Identifier',
          name: 'projectVirtualPath'
        }
      ]
    },
    computed: true,
    value: {
      type: 'ArrayExpression',
      elements: [
        {
          type: 'Literal',
          value: './replaceIt',
          raw: '"./replaceIt"'
        }
      ]
    },
    kind: 'init',
    method: false,
    shorthand: false
  };

  let moduleName: string = scaffoldInstance.moduleName || '';
  moduleName = moduleName.startsWith('/') ? moduleName : '/' + moduleName;
  moduleName = ensureSlash(moduleName, false);

  defaultEntryAst.key.quasis[1].value.raw = moduleName;
  defaultEntryAst.key.quasis[1].value.cooked = moduleName;

  defaultEntryAst.value.elements[0].value = `./client${moduleName}/index.tsx`;
  defaultEntryAst.value.elements[0].raw = `./client${moduleName}/index.tsx`;

  const artConfigPath = join(scaffoldTo, './art.config.js');
  const readableStream: Readable = createReadStream(artConfigPath);
  const buffers: Uint8Array[] = [];

  readableStream.on('data', (data) => { buffers.push(data); });
  readableStream.on('end', () => {
    const fileBuffer = Buffer.concat(buffers);
    const ast = esprima.parseScript(fileBuffer.toString(), {}, (node) => {
      if (node.type === 'Property' && node.key.type === 'Identifier' && node.key.name === 'entry'
        && node.value.type === 'ObjectExpression') {
          node.value.properties.push(defaultEntryAst as Property);
      }
    });

    const sourceCode = escodegen.generate(ast);
    const entryRegex = /(entry.*?\},)/s;
    const newEntry = sourceCode.match(entryRegex);
    if (newEntry === null) { return; }
    replace({
      regex: /(entry.*?\},)/s,
      replacement: newEntry[0],
      paths: [artConfigPath],
      recursive: false,
      silent: true
    });
  });
};