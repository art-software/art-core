import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import { join } from 'path';
import paths from '../config/paths';
import appConfig from '../config/appConfig';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

export const compileImage = (path: string) => {
  return new Promise((resolve) => {
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      // TODO do image minifiy within webpack or gulp
      // .pipe(gulpif(
      //     isProd(),
      //     gulpJSONMinify()
      //   )
      // )
      // .pipe(getDest(vfs))
      .pipe(
        vfs.dest(
          join(paths.appDebug, projectVirtualPath),
          { cwd: paths.appCwd }
        )
      )
      // .pipe(
      //   vfs.dest(
      //     join(paths.appPublic, projectVirtualPath),
      //     { cwd: paths.appCwd }
      //   )
      // )
      .on('end', resolve);
  });
};