import { printInstructions } from '../printLog';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Readable } from 'stream';
import replace from 'replace';

module.exports = function (scaffoldTo) {
  const scaffoldInstance = this;
  printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [index template] file...`);

  const indexTemplatePath = getIndexTemplatePath(scaffoldTo, scaffoldInstance.moduleName);

  const readableStream: Readable = createReadStream(indexTemplatePath);

  readableStream.on('data', () => {
    printInstructions(`Update all scaffold(${scaffoldInstance.scaffoldType}) [art_framework.js]... `);
  });

  const replaceWithString = getReplaceWithString(scaffoldTo);

  return new Promise((resolve, reject) => {
    readableStream.on('end', () => {
      replace({
        regex: 'art_framework.js',
        replacement: replaceWithString,
        paths: [indexTemplatePath],
        recursive: false,
        silent: true
      });
      resolve();
    });
  });

};

const getIndexTemplatePath = (scaffoldTo: string, name: string) => {
  let result: string = '';
  let moduleName: string = name || '';
  moduleName = moduleName.startsWith('/') ? moduleName : '/' + moduleName;
  moduleName = ensureSlash(moduleName, false);
  result = join(scaffoldTo, `./client${moduleName}/index.template.ejs`);
  return result;
};

const getReplaceWithString = (scaffoldTo: string) => {
  let result: string = '';
  const artConfigPath = join(scaffoldTo, './art.config.js');
  const appArtConfig = require(artConfigPath);
  const { projectVirtualPath, webpack } = appArtConfig;
  const virtualPath = projectVirtualPath;
  const version = webpack.dll && webpack.dll.version || 'dll_version_01';
  result = `${virtualPath}/vendors/${version}/art_framework.${version}.js`;
  return result;
};