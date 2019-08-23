import { printInstructions } from '../printLog';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import escodegen from 'escodegen';
const esprima = require('esprima');
import replace from 'replace';
import path from 'path';

module.exports = function (moduleEntry: object) {
  printInstructions(`Update [art config] files...`);
  const artConfigPath = join(process.cwd(), './art.config.js');
  const readableStream: Readable = createReadStream(artConfigPath);
  const buffers: Uint8Array[] = [];

  const moduleList: string[] = [];
  for (const module in moduleEntry) {
    moduleList.push(path.dirname(moduleEntry[module][0]));
  }

  readableStream.on('data', (data) => { buffers.push(data); });
  readableStream.on('end', () => {
    const fileBuffer = Buffer.concat(buffers);
    const ast = esprima.parseScript(fileBuffer.toString(), {}, (node) => {
      if (node.type === 'Property' && node.key.type === 'Identifier' && node.key.name === 'entry'
        && node.value.type === 'ObjectExpression') {
          const properties = node.value.properties;
          const list = [...properties];
          for (const pIndex in properties) {
            const item = properties[pIndex];
            const modulePre = item.value.elements[0].value.split('/index.tsx')[0];
            if (moduleList.indexOf(modulePre) > -1) {
              list.splice(Number(pIndex), 1);
            }
          }
          node.value.properties = [...list];
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