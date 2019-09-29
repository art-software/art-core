import { printInstructions } from '../../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../../scaffoldHelper';
import { configMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files...`);

  const tplMapping = tplMappingAssembler(
    configMapping(scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [config] files ok`);
      callback(null, result);
    })
    .catch(callback);
};