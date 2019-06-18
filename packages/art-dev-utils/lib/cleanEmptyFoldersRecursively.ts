import fs from 'fs';
import path, { relative } from 'path';
import chalk from 'chalk';

export function cleanEmptyFoldersRecursively(folderPath: string) {

  const isDir = fs.statSync(folderPath).isDirectory();
  if (!isDir) {
    return;
  }
  let files = fs.readdirSync(folderPath);
  if (files.length > 0) {
    files.forEach((file) => {
      const fullPath = path.join(folderPath, file);
      cleanEmptyFoldersRecursively(fullPath);
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(folderPath);
  }

  if (files.length === 0) {
    fs.rmdirSync(folderPath);
    console.log(`${chalk.blue('=>')} Empty folder: ${relative(process.cwd(), folderPath)} has been ${chalk.yellow('removed')}`);
    return;
  }
}
