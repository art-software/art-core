import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import { isProd } from '../utils/env';
import gulpif from 'gulp-if';
import gulpImagemin from 'gulp-imagemin';

export const compileImage = (path: string) => {
  return new Promise((resolve) => {
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpif(
          isProd(),
          gulpImagemin()
        )
      )
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};