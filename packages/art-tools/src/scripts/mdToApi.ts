import path from 'path';
import fs from 'fs';
import jclrz from 'json-colorz';
import inquirer = require('inquirer');
import chalk from 'chalk';
import checkFileExist from 'art-dev-utils/lib/checkFileExist';
import md5 from 'blueimp-md5';
import { confirmModules } from '../mdToApi/utils/inquirer';
import { walk } from 'art-dev-utils/lib/fileHelper';
import { warningText } from 'art-dev-utils/lib/chalkColors';
import { startMdToInterface } from '../mdToApi';

interface IModulePath {
  docFolderPath: string;
  modulePath: string;
}

interface IDocManifest {
  entry: string;
  output: string;
  md5: string;
}

interface IWillTransformPath {
  docConfig: IDocManifest[];
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
  transfromModuleMDfiles(modulePaths);
});

// fileEntryPath => api-doc list
const transfromModuleMDfiles = async (fileEntryPath: IModulePath[]) => {
  const deleteOutputList: string[] = [];
  const replaceOutputList: string[] = [];
  const transformFiles: IWillTransformPath[] = [];
  const finalTransformFiles: string[] = [];
  fileEntryPath.forEach((value) => {
    // moduleApiDocs => module md path list
    const moduleApiDocConfig = getModuleApiDocConfig(value.docFolderPath);
    transformFiles.push(moduleApiDocConfig);
    const { docConfig, docManiFestPath } = moduleApiDocConfig;
    const maniFestInfo: IDocManifest[] = getDocManifestInfo(docManiFestPath);
    // has record will check
    if (maniFestInfo.length) {
      // delete collect
      maniFestInfo.forEach((docInfo) => {
        if (!(docConfig.map((doc) => doc.entry).includes(docInfo.entry)) && fs.existsSync(docInfo.output)) {
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
  if (replaceOutputList.length) {
    console.log(chalk.redBright('These files are replaced at compile time!!!'));
    jclrz(replaceOutputList);
    console.log('\n');
  }
  if (deleteOutputList.length) {
    try {
      await deleteOutputFiles(deleteOutputList);
    } catch (err) { console.log(err); }
  }
  console.log(chalk.blue('Start markdown file compilation, please wait.'));
  transformFiles.forEach((fileConfig) => {
    const { docConfig, docManiFestPath } = fileConfig;
    docConfig.forEach((config) => {
      try {
        startMdToInterface(config.entry, config.output);
        finalTransformFiles.push(config.entry);
      } catch (err) { console.log(chalk.red(`markdown file parse fail! \n path: ${config.entry} \n error:`), err); }
    });
    fs.writeFileSync(docManiFestPath, JSON.stringify(docConfig, null, 2), 'utf8');
  });
  jclrz(JSON.stringify(finalTransformFiles, null, 2));
  console.log(chalk.green('You have successfully compiled the above files~~~'));
};

const getModuleApiDocConfig: (folderPath: string) => IWillTransformPath = (folderPath) => {
  const docConfig: IDocManifest[] = [];
  walk(folderPath).forEach((file) => {
    if (path.extname(file) === '.md') {
      const entry = path.relative(process.cwd(), file);
      const fileConfig: IDocManifest = {
        entry,
        output: getOutputPath(entry),
        md5: md5(fs.readFileSync(entry, 'utf8'))
      };
      docConfig.push(fileConfig);
    }
  });
  const moduleDocConfig: IWillTransformPath = {
    docConfig,
    docManiFestPath: path.join(folderPath, '/doc-manifest.json')
  };
  return moduleDocConfig;
};

const getDocManifestInfo: (filePath: string) => IDocManifest[] = (filePath) => {
  let docManifestInfo: IDocManifest[] = [];
  if (fs.existsSync(filePath)) {
    docManifestInfo = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
  }
  return docManifestInfo;
};

// 只会取其中的md类型文件
const getEntryMDFiles: (folderPath: string) => string[] = (folderPath) => {
  const transformFiles: string[] = [];
  walk(folderPath).forEach((file) => {
    if (path.extname(file) === '.md') {
      transformFiles.push(path.relative(process.cwd(), file));
    }
  });
  return transformFiles;
};

const getOutputPath: (entryPath: string) => string = (entryPath) => {
  entryPath = entryPath.replace('api-docs', 'interfaces');
  entryPath = entryPath.replace('.md', '.ts');
  return entryPath;
};

const confirmReplaceFiles = (): Promise<{ replaceOutput: boolean }> => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'replaceOutput',
      default: true,
      message: 'Please confirm whether to replace these files?'
    }
  ]).then((answer: { replaceOutput: boolean }) => {
    return {
      replaceOutput: answer.replaceOutput
    };
  });
};

const choiceDeleteFiles: (deleteFileList: string[]) => Promise<{ chooseList: string[] }> = (deleteFileList) => {
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'chooseList',
      choices: deleteFileList,
      message: 'Please choice you want to delete interface files, choose all will delete all'
    }
  ]).then((answer: { chooseList: string[] }) => {
    return {
      chooseList: answer.chooseList
    };
  });
};

const deleteOutputFiles = (deleteFileList: string[]) => {
  const removeFiles: string[] = [];
  return choiceDeleteFiles(deleteFileList)
    .then((answer) => {
      answer.chooseList.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
          removeFiles.push(file);
        }
      });
      console.log('These files have been deleted!');
      jclrz(removeFiles);
    });
};