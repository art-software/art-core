import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest } from '../utils/vfsHelper';

export const compileExtra = (path: string) => {
  return new Promise((resolve) => {
    vfs.src(path)
      .pipe(plumber(handleErros))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};