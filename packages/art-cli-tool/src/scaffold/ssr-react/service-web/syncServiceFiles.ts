import { printInstructions } from '../../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../../scaffoldHelper';
import { servicesMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, folder: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} services] files...`);

  const tplMapping = tplMappingAssembler(
    [
      ...servicesMapping(scaffoldInstance)
    ],
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} services] files ok`);
      callback(null, result);
    })
    .catch(callback);
};