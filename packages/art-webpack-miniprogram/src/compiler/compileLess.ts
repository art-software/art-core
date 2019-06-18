import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpLess from 'gulp-less';
import gulpRename from 'gulp-rename';
import gulpCleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import { isProd } from '../utils/env';
import chalk from 'chalk';

export const compileLess = (path: string) => {

  return new Promise((resolve) => {

    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpLess())
      .pipe(gulpRename({ extname: '.wxss' }))
      .pipe(
        gulpif(
          isProd(),
          gulpCleanCss({}, (details) => {
            console.log(`${chalk.blue('=>')} ${chalk.green('originalSize:')} ${details.name}: ${details.stats.originalSize / 1000}kb`);
            console.log(`${chalk.blue('=>')} ${chalk.green('minifiedSize:')} ${details.name}: ${details.stats.minifiedSize / 1000}kb`);
          })
        )
      )
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};