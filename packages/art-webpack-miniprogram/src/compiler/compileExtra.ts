import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';

export const compileExtra = (path: string) => {
  return new Promise((resolve) => {
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};