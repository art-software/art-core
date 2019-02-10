import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest } from '../utils/vfsHelper';

export const compileImage = (path: string) => {
  return new Promise((resolve) => {
    vfs.src(path)
      .pipe(plumber(handleErros))
      // TODO do image minifiy within webpack or gulp
      // .pipe(gulpif(
      //     isProd(),
      //     gulpJSONMinify()
      //   )
      // )
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};