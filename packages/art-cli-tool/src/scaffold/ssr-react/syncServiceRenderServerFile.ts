import { printInstructions } from '../printLog';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import replace from 'replace';

module.exports = function (scaffoldTo: string, moduleName: string = '') {
  const scaffoldInstance = this;

  const serverPath = join(scaffoldTo, 'server.ts');

  const upperModuleName = getFirstCodeUpper(moduleName);
  console.log('upperModuleName::', upperModuleName);

  const replaceWithString = `${upperModuleName}: path.join(__dirname, '../../web-react/debug-ssr/demo/ssr/${moduleName}/bundle.js')`;
  console.log('replaceWithString::', replaceWithString);
  console.log('serverPath::', serverPath);

  const readableStream: Readable = createReadStream(serverPath);

  readableStream.on('data', (data) => {
    console.log('data data');
    printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [server.ts]... `);
  });

  return new Promise((resolve, reject) => {
    readableStream.on('end', () => {
      console.log('end end');
      replace({
        regex: `Main: path.join(__dirname, '../../web-react/debug-ssr/demo/ssr/main/bundle.js')`,
        replacement: replaceWithString,
        paths: [serverPath],
        recursive: false,
        silent: true
      });
      resolve();
    });
  });
};

const getFirstCodeUpper = (sourceString: string = '') => {
  if (sourceString) {
    const arr = sourceString.split('');
    const firstUpper = arr[0].toLocaleUpperCase();
    arr.splice(0, 1, firstUpper);
    return arr.join('');
  } else {
    return '';
  }
};