import * as fs from 'fs';
import * as path from 'path';
import request from 'request';
import appConfig from '../config/appConfig';
import isURL from 'art-dev-utils/lib/isURL';
import chalk from 'chalk';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';

export const httpFileUploader = (localAbsFilePath: string, serverRelativePath: string): Promise<string> | undefined => {
  const publicPath = appConfig.get(`art:webpack:output:${appConfig.get('BUILD_ENV')}PublicPath`);
  if (!isURL(publicPath)) {
    chalk.bold.red('please set valid publicPath in art.config.js');
    return;
  }
  if (serverRelativePath.startsWith('/')) {
    chalk.bold.red('please provide relative path string');
    return;
  }
  if (!fs.existsSync(localAbsFilePath)) {
    console.error(`file not found at ${localAbsFilePath}`);
    return;
  }

  const uploadUrl = ensureSlash(publicPath, true) + 'upload_static';
  return new Promise((resolve, reject) => {
    request(uploadUrl, {
      method: 'PUT',
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      },
      formData: {
        file: fs.createReadStream(localAbsFilePath),
        path: serverRelativePath
      }
    }, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(serverRelativePath);
      }
    });
  });
};