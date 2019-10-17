"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const printLog_1 = require("../printLog");
const scaffoldHelper_1 = require("../scaffoldHelper");
const fileSyncMapping = __importStar(require("./fileSyncMapping"));
module.exports = function (scaffoldFrom, scaffoldTo, mapMethod, folder, callback) {
    const scaffoldInstance = this;
    printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} config] files...`);
    const tplMapping = scaffoldHelper_1.tplMappingAssembler(fileSyncMapping[mapMethod](scaffoldInstance), scaffoldFrom, scaffoldTo);
    return scaffoldHelper_1.execCopyFilesTo(tplMapping)
        .then((result) => {
        printLog_1.printInstructions(`Sync all scaffold(${scaffoldInstance.scaffoldType}) [${folder} config] files ok`);
        callback(null, result);
    })
        .catch(callback);
};
