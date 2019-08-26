import { printInstructions } from '../printLog';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import escodegen from 'escodegen';
const esprima = require('esprima');
import replace from 'replace';
import path from 'path';

module.exports = (moduleEntry: object) => {
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
          const propertyValueList = [];
          for (const item of node.value.properties) {
            propertyValueList.push(item.value.elements[0].value.split('/index.tsx')[0] as never);
          }
          for (const list of moduleList) {
            const index = propertyValueList.indexOf(list as never);
            if (index > -1) {
              node.value.properties.splice(index, 1);
              propertyValueList.splice(index, 1);
            }
          }
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