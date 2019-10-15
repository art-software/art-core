import { printInstructions } from '../../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../../scaffoldHelper';
import { controllerMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, folder: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} controller] files...`);

  const tplMapping = tplMappingAssembler(
    [
      ...controllerMapping(scaffoldInstance)
    ],
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} controller] files ok`);
      callback(null, result);
    })
    .catch(callback);
};