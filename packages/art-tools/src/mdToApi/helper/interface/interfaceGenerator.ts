export interface IDocManifest {
  entry: string;
  output: string;
  md5: string;
}

export interface IModuleDocConfig {
  docConfig: IDocManifest[];
  docManiFestPath: string;
}

export interface IWillOperateList {
  deleteOutputList: string[];
  replaceOutputList: string[];
  moduleDocConfigList: IModuleDocConfig[];
  firstCreateModuleList: string[];
}