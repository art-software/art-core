import { printInstructions } from '../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../scaffoldHelper';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);

  const tplMapping = tplMappingAssembler(scaffoldFrom, scaffoldTo, scaffoldInstance);
  console.log(`tplMapping: ${ JSON.stringify(tplMapping) }`);
  execCopyFilesTo(tplMapping);
};