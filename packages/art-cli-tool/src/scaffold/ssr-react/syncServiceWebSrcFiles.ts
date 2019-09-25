import { printInstructions } from '../printLog';
import { execCopyFilesTo, tplMappingAssembler } from '../scaffoldHelper';
import { controllerServiceWebMapping, servicesServiceWebMapping, srcServiceWebMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom: string, scaffoldTo: string, folder: string, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} src] files...`);

  const tplMapping = tplMappingAssembler(
    [
      ...controllerServiceWebMapping(scaffoldInstance),
      ...servicesServiceWebMapping(scaffoldInstance),
      ...srcServiceWebMapping(scaffoldInstance)
    ],
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} src] files ok`);
      callback(null, result);
    })
    .catch(callback);
};