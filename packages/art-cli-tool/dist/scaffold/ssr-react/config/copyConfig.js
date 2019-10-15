let copyInstance;
let scaffoldFrom;
let scaffoldTo;
module.exports = function () {
    copyInstance = this;
    scaffoldFrom = copyInstance.scaffoldFrom;
    scaffoldTo = copyInstance.scaffoldTo;
    return [
        syncIgnoreFiles.bind(this)
    ];
};
const syncIgnoreFiles = (callback) => {
    require(`./syncIgnoreFiles.js`).call(copyInstance, scaffoldFrom, scaffoldTo, callback);
};
