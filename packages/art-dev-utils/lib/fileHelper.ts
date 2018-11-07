import * as fs from 'fs';

export const walk = (dirPath: string) => {
  let results: string[] = [];
  const list = fs.readdirSync(dirPath);
  list.forEach((file) => {
    file = dirPath + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};