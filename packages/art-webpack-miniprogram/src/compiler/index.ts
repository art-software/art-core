import { join } from 'path';
import paths from '../config/paths.js';
import { PROJECTCONFIG } from '../constants/FileNames.js';
import { compileProjectConfig } from './compileProjectConfig';
import { miniprogramWebpackEntry } from '../config/miniprogramWebpackEntry';
import { Configuration } from 'webpack';
import { fileTypeChecker } from '../utils/vfsHelper';
import { compileJS } from './compileJS';
import chalk from 'chalk';
import appConfig from '../config/appConfig';
import { isProd } from '../utils/env.js';
import { removeSync } from 'fs-extra';
import { compileLess } from './compileLess';

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
    if (fileTypeChecker('less', filePath)) {
      return compileLess(filePath, this.webpackConfig);
    }
    // TODO Remove it later
    return compileJS(filePath, this.webpackConfig);
  }

  public ready = (watcherDone: () => any) => {
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

  public add = (path: string) => {
    fileQueue.push(
      new Promise((resolve, reject) => {
        this.execCompileTask(path)
          .then(() => {
            console.log(`${chalk.blue('=>')} File ${chalk.cyan(path)} added`);
            resolve(path);
          })
          .catch(reject);
      })
    );
  }

  public remove = (path: string) => {
    const projectVirtualPath = appConfig.get('art:projectVirtualPath');
    const fileCompiledPath = join(
      isProd() ? paths.appPublic : paths.appDebug,
      projectVirtualPath,
      path.replace('client', '')
    ).replace(/.less$/i, '.wxss').replace(/.ts$/i, '.js');
    removeSync(fileCompiledPath);
    console.log(`${chalk.blue('=>')} File ${chalk.cyan(path)} was removed`);
  }

  public change = (path: string) => {
    console.log(`${chalk.blue('=>')} File ${chalk.cyan(path)} changed, ${chalk.magenta('transforming')}...`);
    this.execCompileTask(path)
      .then(() => {
        console.log(`${chalk.blue('=>')} File ${chalk.cyan(path)} transform ${chalk.magenta('done')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}