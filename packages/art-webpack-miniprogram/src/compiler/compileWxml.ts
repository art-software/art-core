import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpif from 'gulp-if';
import { isProd } from '../utils/env';
import gulpHtmlmin from 'gulp-htmlmin';

const htmlminOptions = {
  collapseWhitespace: true,
  keepClosingSlash: true, // xml
  removeComments: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  caseSensitive: true,
  collapseBooleanAttributes: false
};

export const compileWxml = (path: string) => {
  return new Promise((resolve) => {
    console.log('wxml path: ', path);
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpif(
          isProd(),
          gulpHtmlmin(htmlminOptions)
        )
      )
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};