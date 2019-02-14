import { join } from 'path';
import paths from '../config/paths';
import { PROJECTCONFIG } from '../constants/FileNames';
import { compileProjectConfig } from './compileProjectConfig';
import { miniprogramWebpackEntry } from '../config/miniprogramWebpackEntry';
import { Configuration } from 'webpack';
import { fileTypeChecker } from '../utils/vfsHelper';
import { compileJS } from './compileJS';
import chalk from 'chalk';
import appConfig from '../config/appConfig';
import { isProd } from '../utils/env';
import { removeSync } from 'fs-extra';
import { compileLess } from './compileLess';
import { FileTypes } from '../enums/FileTypes';
import { compileWxml } from './compileWxml';
import { compileJSON } from './compileJSON';
import { compileImage } from './compileImage';
import { compileExtra } from './compileExtra';
import { DependencyMapping } from './dependencyMapping';

const fileQueue: Array<Promise<any>> = [];

export class MiniProgramCompiler {
  constructor(webpackConfig: Configuration) {
    this.webpackConfig = webpackConfig;
  }
  public webpackConfig: Configuration;

  private execCompileTask (filePath: string) {
    if (fileTypeChecker(FileTypes.scripts, filePath)) {
      return compileJS(filePath, this.webpackConfig);
    }
    if (fileTypeChecker(FileTypes.less, filePath)) {
      return compileLess(filePath, this.webpackConfig);
    }
    if (fileTypeChecker(FileTypes.xml, filePath)) {
      return compileWxml(filePath);
    }
    if (fileTypeChecker(FileTypes.json, filePath)) {
      return compileJSON(filePath);
    }
    if (fileTypeChecker(FileTypes.image, filePath)) {
      return compileImage(filePath);
    }
    return compileExtra(filePath);
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
    console.log('add: ', path);
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

    // update dependencies mapping
    if (fileTypeChecker(FileTypes.scripts, fileCompiledPath)) {
      const mapping = DependencyMapping.deleteMapping(path);
      console.log(chalk.green('Current mapping: '), mapping);
    }
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