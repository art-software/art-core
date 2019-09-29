import { printInstructions } from '../../printLog';
import { tplMappingAssembler, execCopyFilesTo } from '../../scaffoldHelper';
import { artConfigMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom, scaffoldTo, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [art config] files...`);

  const tplMapping = tplMappingAssembler(
    artConfigMapping(scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [art config] files ok`);
      callback(null, result);
    })
    .catch(callback);
};