import { confirmModules } from '../utils/inquirer';
import { httpFileUploader } from '../utils/httpFileUploader';
import { walk } from 'art-dev-utils/lib/fileHelper';
import * as path from 'path';
import chalk from 'chalk';
import async from 'async';
import inquirer from 'inquirer';

const DEBUG_PATH = 'debug';
const PUBLISH_PATH = DEBUG_PATH;

confirmModules((answer) => {
  if (!answer.availableModulesOk) { return; }

  const modules = answer.moduleEntryKeys;

  let allFiles: string[] = [];
  modules.forEach((modulePath) => {
    allFiles = allFiles.concat(walk(path.join(process.cwd(), PUBLISH_PATH, modulePath)));
  });

  // Do file filter if necessary
  // allFiles = allFiles.filter((file: string, index: number) => {});

  allFiles.forEach((filePath) => {
    const metaPath = path.relative(path.join(process.cwd(), PUBLISH_PATH), filePath);
    console.log(chalk.green(`${metaPath}`));
  });

  const uploadSingleFile = async (localAbsFilePath: string, serverRelativePath: string, callback) => {
    const metaPath = path.relative(path.join(process.cwd(), PUBLISH_PATH), localAbsFilePath);
    try {
      const uploadResult = await httpFileUploader(localAbsFilePath, serverRelativePath);
      if (!uploadResult) { return; }
      console.log(chalk.magenta(` ➩ uploading ${chalk.cyan(metaPath)} has successful'!`));
      callback(null, uploadResult);
    } catch (err) {
      console.log(chalk.magenta(` ➩ uploading ${chalk.cyan(metaPath)} has failed'!`));
      callback(err, metaPath);
    }
  };

  const asyncQueue: any[] = [];

  allFiles.forEach((fileAbsPath: string) => {
    const metaPath = path.relative(path.join(process.cwd(), PUBLISH_PATH), fileAbsPath);
    let serverRelativePath = path.dirname(metaPath);
    serverRelativePath = 'frontend/' + serverRelativePath;

    asyncQueue.push(
      (callback) => {
        uploadSingleFile(fileAbsPath, serverRelativePath, callback);
      }
    );
  });

  if (!asyncQueue.length) {
    return console.log(chalk.red.bold(`\nCould not find any file with current publish config !\n`));
  }

  inquirer.prompt({ type: 'confirm', name: 'confirm', message: 'Please confirm above upload files?' })
    .then((result: any) => {
      if (result.confirm === true) {
        async.parallel(asyncQueue, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(chalk.cyan.bold('\n ====Publish files successfully====\n'));
          }
        });
      }
    });
});