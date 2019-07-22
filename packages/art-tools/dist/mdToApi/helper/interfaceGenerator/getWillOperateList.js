"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blueimp_md5_1 = __importDefault(require("blueimp-md5"));
const fs_1 = __importDefault(require("fs"));
const getInterfaceDocConfig_1 = require("./getInterfaceDocConfig");
exports.getWillOperateList = (docFolderList) => {
    const deleteOutputList = [];
    const replaceOutputList = [];
    const moduleDocConfigList = [];
    const firstCreateModuleList = [];
    docFolderList.forEach((docFolder) => {
        // moduleApiDocs => module md path list
        const moduleApiDocConfig = getInterfaceDocConfig_1.getModuleDocToInterfaceConfig(docFolder);
        moduleDocConfigList.push(moduleApiDocConfig);
        const { docConfig, docManiFestPath } = moduleApiDocConfig;
        const maniFestInfo = getInterfaceDocConfig_1.getDocManifestInfo(docManiFestPath);
        // has record will check
        if (maniFestInfo.length) {
            // delete collect
            maniFestInfo.forEach((docInfo) => {
                if (!(docConfig.map((info) => info.entry).includes(docInfo.entry)) && fs_1.default.existsSync(docInfo.output)) {
                    deleteOutputList.push(docInfo.output);
                }
            });
            // diff contrast use md5
            docConfig.forEach((config) => {
                maniFestInfo.forEach((docInfo) => {
                    if (docInfo.entry === config.entry &&
                        docInfo.output === config.output &&
                        docInfo.md5 !== blueimp_md5_1.default(fs_1.default.readFileSync(config.entry, 'utf8'))) {
                        replaceOutputList.push(config.output);
                    }
                });
            });
        }
        else {
            firstCreateModuleList.push(docFolder);
        }
    });
    return { deleteOutputList, replaceOutputList, moduleDocConfigList, firstCreateModuleList };
};
