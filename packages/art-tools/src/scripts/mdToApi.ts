import { confirmModules } from '../mdToApi/utils/inquirer';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import path from 'path';
import fs from 'fs';
import { walk } from 'art-dev-utils/lib/fileHelper';
import { warningText } from 'art-dev-utils/lib/chalkColors';
// import { startMdToInterface } from '../mdToApi';
import md5 from 'blueimp-md5';
import { readFileSync } from 'fs';

interface IModulePath {
  docFolderPath: string;
  modulePath: string;
}

interface IWillTransformPath {
  docPaths: string[];
  docManiFestPath: string;
}

confirmModules(async (answer) => {
  if (!answer.availableModulesOk) { return; }
  const moduleList: string[] = [];
  const { moduleEntry = [] } = answer;
  for (const module in moduleEntry) {
    moduleList.push(path.dirname(moduleEntry[module][0]));
  }
  const modulePaths: IModulePath[] = moduleList.map((value) => {
    return {
      docFolderPath: path.join(value, '/services/api-docs'),
      modulePath: value
    };
  });
  if (!checkFileExist(modulePaths.map((value) => value.docFolderPath))) {
    console.log(warningText('No api-docs folder in the module, please append first!'));
    return;
  }
  // 这里就拿到了对应要转换的模块，并且保证了其模块下面有对应的api-docs文件夹，那么这里需要执行的就是一个entry到output的事情
  transfromMDfiles(modulePaths);
});

const transfromMDfiles = (fileEntryPath: IModulePath[]) => {
  /** 
   * 1. 拿到entry
   * 2. 拿到output
   * 3. transfrom
   * 4. write
   */
  const transformFiles: IWillTransformPath[] = [];
  fileEntryPath.forEach((value) => {
    transformFiles.push({
      docPaths: getWillTransformFiles(value.docFolderPath),
      docManiFestPath: path.join(value.modulePath, '/services/doc-manifest.json')
    });
  });
  // 去判断是否有manifest做对比
  transformFiles.forEach((value) => {
    fs.exists(value.docManiFestPath, (status) => {
      console.log(value.docManiFestPath, status);
    });
  });
  // transformFiles.forEach((value) => {
  //   value.forEach((file) => {
  //     console.log(md5(readFileSync(file)));
  //     // const output = getOutputPath(file);
  //     // startMdToInterface(file, output);
  //   });
  // });
};

// 只会取其中的md类型文件
const getWillTransformFiles: (folderPath: string) => string[] = (folderPath) => {
  const transformFiles: string[] = [];
  walk(folderPath).forEach((file) => {
    if (path.extname(file) === '.md') {
      transformFiles.push(path.resolve(file));
    }
  });
  return transformFiles;
};

const getOutputPath: (entryPath: string) => string = (entryPath) => {
  entryPath = entryPath.replace('api-docs', 'interfaces');
  entryPath = entryPath.replace('.md', '.ts');
  return entryPath;
};

const contrastMdContent = () => {
};