import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpLess from 'gulp-less';
import gulpRename from 'gulp-rename';

export const compileLess = (path: string) => {

  return new Promise((resolve) => {

    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpLess())
      .pipe(gulpRename({ extname: '.wxss' }))
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};