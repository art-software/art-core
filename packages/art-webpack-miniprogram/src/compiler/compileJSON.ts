import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpif from 'gulp-if';
import { isProd } from '../utils/env';
import gulpJSONMinify from 'gulp-jsonminify';

export const compileJSON = (path: string) => {
  return new Promise((resolve) => {
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpif(
          isProd(),
          gulpJSONMinify()
        )
      )
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};