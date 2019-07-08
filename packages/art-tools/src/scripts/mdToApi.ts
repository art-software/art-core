import { confirmModules } from '../mdToApi/utils/inquirer';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import path from 'path';
import { walk } from 'art-dev-utils/lib/fileHelper';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import { startMdToInterface } from '../mdToApi';
import md5 from 'blueimp-md5';
import { readFileSync } from 'fs';

interface IMDFilePath {
  filePaths: string[];
  modulePath: string;
}

confirmModules(async (answer) => {
  if (!answer.availableModulesOk) { return; }
  let moduleList: string[] = [];
  const { moduleEntry = [] } = answer;
  for (const module in moduleEntry) {
    moduleList.push(path.dirname(moduleEntry[module][0]));
  }
  moduleList = moduleList.map((value) => `${value}/services/api-docs`);
  if (!checkFileExist(moduleList)) {
    console.log(warningText('No api-docs folder in the module, please append first!'));
    return;
  }
  // 这里就拿到了对应要转换的模块，并且保证了其模块下面有对应的api-docs文件夹，那么这里需要执行的就是一个entry到output的事情
  transfromMDfiles(moduleList);
});

const transfromMDfiles = (fileEntry: string[]) => {
  /** 
   * 1. 拿到entry
   * 2. 拿到output
   * 3. transfrom
   * 4. write
   */
  const transformFiles: string[][] = [];
  fileEntry.forEach((value) => {
    transformFiles.push(getWillTransformFiles(value));
  });
  transformFiles.forEach((value) => {
    value.forEach((file) => {
      console.log(md5(readFileSync(file)));
      // const output = getOutputPath(file);
      // startMdToInterface(file, output);
    });
  });
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