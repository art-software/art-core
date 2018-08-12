import * as fs from 'fs';
import * as path from 'path';
import { warningText, cyanText, cyanBoldText } from './chalkColors';

const checkFileExist = (filePaths: string[]): boolean => {
  let currentFilePath: string = '';
  try {
    filePaths.forEach((filePath) => {
      currentFilePath = filePath;
      fs.accessSync(filePath, fs.constants.F_OK);
    });
    return true;
  } catch (error) {
    const dirName = path.dirname(currentFilePath);
    const fileName = path.basename(currentFilePath);
    console.log();
    console.log(warningText('Could not find a required file.'));
    console.log(warningText('➩ Name: ') + cyanBoldText(fileName));
    console.log(warningText('➩ Searched in: ') + cyanBoldText(dirName));
    console.log(warningText(`Full path: ${cyanText(currentFilePath)}`));
    return false;
  }
};

export default checkFileExist;