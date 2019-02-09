import { join } from 'path';
import paths from '../config/paths.js';
import { PROJECTCONFIG } from '../constants/FileNames.js';
import { compileProjectConfig } from './compileProjectConfig';
import { miniprogramWebpackEntry } from '../config/miniprogramWebpackEntry';
import { Configuration } from 'webpack';
import { fileTypeChecker } from '../utils/vfsHelper';
import { compileJS } from './compileJS';
import chalk from 'chalk';

const fileQueue: Array<Promise<any>> = [];

export class MiniProgramCompiler {
  constructor(webpackConfig: Configuration) {
    this.webpackConfig = webpackConfig;
  }
  public webpackConfig: Configuration;

  private execCompileTask (filePath: string) {
    if (fileTypeChecker('scripts', filePath)) {
      return compileJS(filePath, this.webpackConfig);
    }
    // TODO Remove it later
    return compileJS(filePath, this.webpackConfig);
  }

  public add(path: string) {
    fileQueue.push(
      new Promise((resolve, reject) => {
        this.execCompileTask(path)
          .then(() => {
            console.log(`${chalk.blue('=>')} File ${chalk.cyan(path)} was added`);
            resolve(path);
          })
          .catch(reject);
      })
    );
  }

  public ready(watcherDone: () => any) {
    return () => {
      Promise.all(fileQueue)
        .then(() => {
          fileQueue.length = 0;
          const debugProjectConfigPath = join(paths.appDebug, miniprogramWebpackEntry().entryKey, PROJECTCONFIG);
          compileProjectConfig({projectConfigPath: debugProjectConfigPath})
            .then(() => {
              if (watcherDone) {
                watcherDone();
              }
            });
        });
    };
  }
}