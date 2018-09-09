import { Stats } from 'webpack';
import { dirname, basename, join, relative } from 'path';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import chalk from 'chalk';
import { forEach } from 'lodash';
import async from 'async';

const printCompressImagelog = (files: any[], buildFolder) => {
  files.map((file) => {
    const fileAbsName = file.path;
    const fileBasename = basename(fileAbsName);
    const fileDirname = dirname(fileAbsName);
    const folder = relative(buildFolder, fileDirname);

    console.log(
      `➩ ${folder}/${chalk.cyan(fileBasename)}`
    );
  });
};

export default function compressImages(webpackStats: Stats, buildFolder) {
  const folderFiles = {};
  webpackStats.toJson()
    .assets.filter((asset) => {
      return /\.(png|jpg|git)$/.test(asset.name.split('?')[0]);
    })
    .forEach((asset) => {
      const assetName = asset.name.split('?')[0];
      const folder = dirname(assetName);
      const name = basename(assetName);
      const folderAbsPath = join(buildFolder, folder);

      if (!folderFiles[folderAbsPath]) {
        folderFiles[folderAbsPath] = [];
      }
      folderFiles[folderAbsPath].push(join(folderAbsPath, name));
    });

  const asyncQueue: any[] = [];
  const getAsyncQueue = (imagesSrc, targetDest) => {
    return async (callback) => {
      try {
        const files = await imagemin(imagesSrc, targetDest, {
          plugins: [
            imageminJpegtran(),
            imageminPngquant({ quality: '65-80' })
          ]
        });
        printCompressImagelog(files, buildFolder);
        callback(null);
      } catch (err) {
        callback(err);
      }

    };
  };

  forEach(folderFiles, (imagesSrc, targetDest) => {
    asyncQueue.push(getAsyncQueue(imagesSrc, targetDest));
  });

  return new Promise((resolve, reject) => {
    if (asyncQueue.length) {
      console.log(chalk.green('Optimizing the image size...\n'));
    }

    async.parallel(asyncQueue, (err, result) => {
      if (err) { return reject(err); }

      console.log(chalk.green(`\nOptimizing the image successfully.\n`));
      return resolve(result);
    });
  });
}