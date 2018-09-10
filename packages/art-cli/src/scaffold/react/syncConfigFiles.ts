import { printInstructions } from '../printLog';
import { execCopyFilesTo, tplHandler } from '../scaffoldHelper';
import { copy } from 'fs-extra';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, callback) {
  console.log('syncConfigFiles');

  const tplFiles = [
    '.babelrc',
    '.eslintrc.json',
    '.artignore',
    'tsconfig.json',
    'tsconfig-mock.json',
    'tslint.json',
    'package.json',
    'README.md'
  ];

  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);

  const tplMapping = tplHandler(tplFiles, scaffoldFrom, scaffoldTo, scaffoldInstance);
  console.log(`tplMapping: ${ JSON.stringify(tplMapping) }`);
  execCopyFilesTo(tplMapping);
};