import recursive from 'recursive-readdir';
import { sync } from 'gzip-size';
import { readFileSync } from 'fs';

function removeFileNameHash(buildFolder: string, fileName: string): string {
  return fileName
    .replace(buildFolder, '')
    .replace(/\/?(.*)(\.\w+)(\.js|\.css)/, (match, p1, p2, p3) => p1 + p3);
}

export interface FileSizeProps {
  root: string;
  size: object;
}

export function measureFileSizesBeforeBuild(buildFolder: string) {
  return new Promise<FileSizeProps>((resolve) => {
    recursive(buildFolder, (error, files) => {

      let size;
      if (!error && files.length) {
        size = files.filter((file) => /\.(js|css)$/.test(file))
          .reduce((prev, file) => {
            const contents = readFileSync(file);
            const key = removeFileNameHash(buildFolder, file);
            prev[key] = sync(contents);
            return prev;
          }, {});
      }

      resolve({
        root: buildFolder,
        size: size || {}
      });
    });
  });
}