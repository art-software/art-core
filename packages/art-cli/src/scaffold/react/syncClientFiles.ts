import { printInstructions } from '../printLog';
import { tplMappingAssembler, execCopyFilesTo } from '../scaffoldHelper';
import { clientMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom, scaffoldTo, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [client] files...`);

  const tplMapping = tplMappingAssembler(
    clientMapping(scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [client] files ok`);
      callback(null, result);
    })
    .catch(callback);
};