import { join } from 'path';

const FolderName = 'service-render';

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
    syncServiceRenderServerFiles.bind(this)
  ];
};

const syncSSRConfigFiles = (callback) => {
  require(`./syncFolderConfigFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName),
    join(scaffoldTo, FolderName),
    'configServiceRenderMapping',
    FolderName,
    callback
  );
};

const syncServiceRenderServerFiles = (callback) => {
  require(`./syncServiceRenderServerFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName, 'src'),
    join(scaffoldTo, FolderName, 'src'),
    FolderName,
    callback
  );
};
