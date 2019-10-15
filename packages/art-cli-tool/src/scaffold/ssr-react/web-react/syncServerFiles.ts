import { printInstructions } from '../../printLog';
import { tplMappingAssembler, execCopyFilesTo } from '../../scaffoldHelper';
import { serverMapping } from './fileSyncMapping';

module.exports = function (scaffoldFrom, scaffoldTo, callback) {
  const scaffoldInstance = this;
  printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [mock server] files...`);

  const tplMapping = tplMappingAssembler(
    serverMapping(scaffoldInstance),
    scaffoldFrom,
    scaffoldTo
  );

  return execCopyFilesTo(tplMapping)
    .then((result) => {
      printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [mock server] files ok`);
      callback(null, result);
    })
    .catch(callback);
};