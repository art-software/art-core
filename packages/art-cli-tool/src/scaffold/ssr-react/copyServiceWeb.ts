import { join } from 'path';

const FolderName = 'service-web';

let copyInstance;
let scaffoldFrom;
let scaffoldTo;
let moduleName;

module.exports = function () {
  copyInstance = this;
  scaffoldFrom = copyInstance.scaffoldFrom;
  scaffoldTo = copyInstance.scaffoldTo;
  moduleName = copyInstance.moduleName;
  return [
    syncSSRConfigFiles.bind(this),
    syncSSRSrcFiles.bind(this)
  ];
};

const syncSSRConfigFiles = (callback) => {
  require(`./syncFolderConfigFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName),
    join(scaffoldTo, FolderName),
    'configServiceWebMapping',
    FolderName,
    callback
  );
};

const syncSSRSrcFiles = (callback) => {
  require(`./syncServiceWebSrcFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName),
    join(scaffoldTo, FolderName),
    FolderName,
    callback
  );
};
