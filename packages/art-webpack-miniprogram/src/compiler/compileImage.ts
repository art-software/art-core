import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import { join } from 'path';
import paths from '../config/paths';
import appConfig from '../config/appConfig';
import { isProd } from '../utils/env';
import gulpif from 'gulp-if';
import gulpImagemin from 'gulp-imagemin';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

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