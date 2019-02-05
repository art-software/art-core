import appConfig from '../config/appConfig';
import { join } from 'path';
import paths from '../config/paths.js';
import { PROJECTCONFIG } from '../constants/FileNames.js';
import { compileProjectConfig } from './compileProjectConfig';
import { miniprogramWebpackEntry } from '../config/miniprogramWebpackEntry';

const fileQueue = [];

export class MiniProgramCompiler {
  public ready (watcherDone: () => any) {
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