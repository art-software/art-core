import * as fs from 'fs';
import * as path from 'path';

export const mkdirsSync: (dirname: string) => any = (dirname) => {
  try {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  } catch (err) {
    console.log('err', err);
  }
};