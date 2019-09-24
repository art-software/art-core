import { printInstructions } from '../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../scaffoldHelper';
import * as fileSyncMapping from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, mapMethod: string, folder: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} config] files...`);

  const tplMapping = tplMappingAssembler(
    fileSyncMapping[mapMethod](scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} config] files ok`);
      callback(null, result);
    })
    .catch(callback);
};