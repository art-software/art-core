import { printInstructions } from '../../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../../scaffoldHelper';
import { ignoreMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [ignore] files...`);

  const tplMapping = tplMappingAssembler(
    ignoreMapping(scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [ignore] files ok`);
      callback(null, result);
    })
    .catch(callback);
};