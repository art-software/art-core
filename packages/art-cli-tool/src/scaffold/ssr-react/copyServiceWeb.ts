import { join, resolve } from 'path';

const FolderName = 'service-web';

let copyInstance;
let scaffoldFrom;
let scaffoldTo;

module.exports = function () {
  copyInstance = this;
  scaffoldFrom = copyInstance.scaffoldFrom;
  scaffoldTo = copyInstance.scaffoldTo;
  return [
    syncSSRConfigFiles.bind(this),
    syncSSRSrcFiles.bind(this),
    syncSSRControllerFiles.bind(this),
    syncSSRServiceFiles.bind(this),
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
const syncSSRControllerFiles = (callback) => {
  require(`./syncServiceWebControllerFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName),
    join(scaffoldTo, FolderName),
    FolderName,
    callback
  );
};
const syncSSRServiceFiles = (callback) => {
  require(`./syncServiceWebServiceFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName),
    join(scaffoldTo, FolderName),
    FolderName,
    callback
  );
};
