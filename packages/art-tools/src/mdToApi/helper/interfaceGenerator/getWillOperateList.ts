import md5 from 'blueimp-md5';
import fs from 'fs';
import { IWillOperateList, IModuleDocConfig, IDocManifest } from '../interface/interfaceGenerator';
import { getModuleApiDocConfig, getDocManifestInfo } from './getDocConfig';

export const getWillOperateList: (docFolderList: string[]) => IWillOperateList = (docFolderList) => {
  const deleteOutputList: string[] = [];
  const replaceOutputList: string[] = [];
  const moduleDocConfigList: IModuleDocConfig[] = [];
  docFolderList.forEach((docFolder) => {
    // moduleApiDocs => module md path list
    const moduleApiDocConfig = getModuleApiDocConfig(docFolder);
    moduleDocConfigList.push(moduleApiDocConfig);
    const { docConfig, docManiFestPath } = moduleApiDocConfig;
    const maniFestInfo: IDocManifest[] = getDocManifestInfo(docManiFestPath);
    // has record will check
    if (maniFestInfo.length) {
      // delete collect
      maniFestInfo.forEach((docInfo) => {
        if (!(docConfig.map((info) => info.entry).includes(docInfo.entry)) && fs.existsSync(docInfo.output)) {
          deleteOutputList.push(docInfo.output);
        }
      });
      // diff contrast use md5
      docConfig.forEach((config) => {
        maniFestInfo.forEach((docInfo) => {
          if (docInfo.entry === config.entry &&
            docInfo.output === config.output &&
            docInfo.md5 !== md5(fs.readFileSync(config.entry, 'utf8'))) {
            replaceOutputList.push(config.output);
          }
        });
      });
    }
  });
  return { deleteOutputList, replaceOutputList, moduleDocConfigList };
};