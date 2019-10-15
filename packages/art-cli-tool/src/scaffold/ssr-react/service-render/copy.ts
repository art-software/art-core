import { join } from 'path';

const FolderName = 'service-render';

let copyInstance;
let scaffoldFrom;
let scaffoldTo;

module.exports = function () {
  copyInstance = this;
  scaffoldFrom = copyInstance.scaffoldFrom;
  scaffoldTo = copyInstance.scaffoldTo;
  return [
    syncConfigFiles.bind(this),
    syncServerFiles.bind(this)
  ];
};

const syncConfigFiles = (callback) => {
  require(`./syncConfigFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName),
    join(scaffoldTo, FolderName),
    FolderName,
    callback
  );
};

const syncServerFiles = (callback) => {
  require(`./syncServerFiles.js`).call(
    copyInstance,
    join(scaffoldFrom, FolderName, 'src'),
    join(scaffoldTo, FolderName, 'src'),
    FolderName,
    callback
  );
};
