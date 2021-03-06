import { printInstructions } from '../../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../../scaffoldHelper';
import { serverMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, folder: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} server] files...`);

  const tplMapping = tplMappingAssembler(
    serverMapping(scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} server] files ok`);
      callback(null, result);
    })
    .catch(callback);
};