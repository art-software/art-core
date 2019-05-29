import { join, relative, dirname } from 'path';
import paths from '../config/paths';
import { PROJECTCONFIG } from '../constants/FileNames';
import { compileProjectConfig } from './compileProjectConfig';
import { miniprogramWebpackEntry } from '../config/miniprogramWebpackEntry';
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
import { dependencyTree } from './dependencyTree';
import { cleanEmptyFoldersRecursively } from 'art-dev-utils/lib/cleanEmptyFoldersRecursively';
import recursiveReaddir from 'recursive-readdir';

const fileQueue: Array<Promise<any>> = [];
const fileBuildQueue: Array<Promise<any>> = [];

export class MiniProgramCompiler {

  private execCompileTask(filePath: string) {
    if (fileTypeChecker(FileTypes.scripts, filePath)) {
      return compileJS(filePath);
    }
    if (fileTypeChecker(FileTypes.less, filePath)) {
      return compileLess(filePath);
    }
    if (fileTypeChecker(FileTypes.xml, filePath)) {
      return compileWxml(filePath);
    }
    if (fileTypeChecker(FileTypes.json, filePath)) {
      return compileJSON(filePath);
    }
    if (fileTypeChecker(FileTypes.image, filePath)) {
      // return new Promise((resolve) => { return resolve(); });
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
          compileProjectConfig({ projectConfigPath: debugProjectConfigPath })
            .then(() => {
              if (watcherDone) {
                watcherDone();
              }
            });
        });
    };
  }

  public add = (path: string) => {
    console.log(`${chalk.blue('=>')} ${chalk.green('Start add:')} ${path}`);
    fileQueue.push(
      new Promise((resolve, reject) => {
        this.execCompileTask(path)
          .then(() => {
            console.log(`${chalk.blue('=>')} ${path} ${chalk.green('added')}`);
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

    try {
      removeSync(fileCompiledPath);
      const dirnamePath = dirname(fileCompiledPath);
      console.log(`${chalk.blue('=>')} ${path} has been ${chalk.yellow('removed')}`);
      cleanEmptyFoldersRecursively(dirnamePath);
    } catch (e) {
      console.log(`${chalk.red('REMOVE FILE ERROR ')} ${path}`);
      console.log(e);
    }

    // update script file dependencies
    if (fileTypeChecker(FileTypes.scripts, fileCompiledPath)) {
      const depsMapping = DependencyMapping.getMapping(path);
      if (!depsMapping) { return; }
      const mapping = DependencyMapping.deleteMapping(path);
      let allMapping: string[] = [];
      for (const value of mapping.values()) {
        allMapping = allMapping.concat(value);
      }
      const deleteableDeps: string[] = [];
      depsMapping.forEach((dep) => {
        if (!allMapping.includes(dep)) {
          deleteableDeps.push(dep);
        }
      });

      const deleteableDepsTree = dependencyTree(deleteableDeps);
      const rootDir = process.env.STAGE === 'dev' ?
        join(paths.appCwd, '../../node_modules/') : paths.appNodeModules;
      deleteableDepsTree.forEach((filePath) => {
        DependencyMapping.removeWillCompiledDependencies(filePath);

        const relativePath = relative(rootDir, filePath);
        const absDebugPath = join(process.cwd(), 'debug', projectVirtualPath, 'lib', relativePath);
        try {
          removeSync(absDebugPath);
          console.log(`${chalk.blue('=>')} Dependency file ${relative(process.cwd(), absDebugPath)} has been ${chalk.yellow('removed')}`);
        } catch (e) {
          console.log(`${chalk.red('REMOVE FILE ERROR ')} ${absDebugPath}`);
          console.log(e);
        }
      });

      // delete empty folders in debug/lib directory
      const debugLibPath = join(process.cwd(), 'debug', projectVirtualPath, 'lib');
      cleanEmptyFoldersRecursively(debugLibPath);
    }
  }

  public change = (path: string) => {
    console.log(`${chalk.blue('=>')} ${path} changed, ${chalk.magenta('transforming')}...`);
    this.execCompileTask(path)
      .then(() => {
        console.log(`${chalk.blue('=>')} ${path} ${chalk.magenta('transform done')}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public buildAll = () => {
    const clienPath = paths.appSrc;
    recursiveReaddir(clienPath, (err, files) => {
      if (err) { throw err; }
      files.forEach((file) => {
        const processRelativePath = relative(process.cwd(), file);
        console.log(`${chalk.blue('=>')} ${chalk.green('Start add:')} ${processRelativePath}`);
        fileBuildQueue.push(
          new Promise((resolve, reject) => {
            this.execCompileTask(processRelativePath)
              .then(() => {
                console.log(`${chalk.blue('=>')} ${processRelativePath} ${chalk.green('added')}`);
                resolve(processRelativePath);
              })
              .catch(reject);
          })
        );
      });
    });
  }
}