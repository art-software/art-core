import vfs from 'vinyl-fs';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import gulpif from 'gulp-if';
import { isProd } from '../utils/env';
import gulpHtmlmin from 'gulp-htmlmin';
import gulpRename from 'gulp-rename';

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
    vfs.src(path, getSrcOptions())
      .pipe(plumber(handleErros))
      .pipe(gulpRename({ extname: '.wxml' }))
      .pipe(gulpif(
          isProd(),
          gulpHtmlmin(htmlminOptions)
        )
      )
      .pipe(getDest(vfs))
      .on('end', resolve);
  });
};