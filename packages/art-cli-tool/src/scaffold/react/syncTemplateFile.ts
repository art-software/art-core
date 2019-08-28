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

  const replaceWithString = getReplacementString(scaffoldTo);

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
  let templatePath: string = '';
  let moduleName: string = name || '';
  moduleName = moduleName.startsWith('/') ? moduleName : '/' + moduleName;
  moduleName = ensureSlash(moduleName, false);
  templatePath = join(scaffoldTo, `./client${moduleName}/index.template.ejs`);
  return templatePath;
};

const getReplacementString = (scaffoldTo: string) => {
  let replacement: string = '';
  const artConfigPath = join(scaffoldTo, './art.config.js');
  const appArtConfig = require(artConfigPath);
  const { projectVirtualPath = '', webpack = {} } = appArtConfig;
  const version = (webpack.dll || {}).version || 'dll_version_01';
  replacement = `${projectVirtualPath}/vendors/${version}/art_framework.${version}.js`;
  return replacement;
};