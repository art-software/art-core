import { join, resolve } from 'path';
import { CreateCmdTypes } from '../../enums/CreateCmdTypes';

const FolderName = 'service-web';

let copyInstance;
let scaffoldFrom;
let scaffoldTo;
let moduleName;

module.exports = function (type: CreateCmdTypes) {
  console.log('type:::', type);
  copyInstance = this;
  moduleName = copyInstance.moduleName;
  scaffoldFrom = copyInstance.scaffoldFrom;
  scaffoldTo = copyInstance.scaffoldTo;
  if (type === CreateCmdTypes.project) {
    return [
      syncSSRConfigFiles.bind(this),
      syncSSRSrcFiles.bind(this),
      syncSSRControllerFiles.bind(this),
      syncSSRServiceFiles.bind(this),
    ];
  } else if (type === CreateCmdTypes.module) {
    scaffoldTo = resolve(copyInstance.scaffoldTo, '../');
    return [
      syncSSRControllerFiles.bind(this),
      syncSSRServiceFiles.bind(this),
    ];
  }
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
