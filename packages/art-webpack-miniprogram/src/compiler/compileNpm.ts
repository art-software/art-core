import { DependencyMapping } from './dependencyMapping';
import { writeFile } from 'fs';
import paths from '../config/paths';
import vfs from 'vinyl-fs';
import { Configuration } from 'webpack';
import { join } from 'path';
import { isProd } from '../utils/env';
import appConfig from '../config/appConfig';
import plumber from 'gulp-plumber';
import { handleErros, getDest, getSrcOptions } from '../utils/vfsHelper';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

const projectVirtualPath = appConfig.get('art:projectVirtualPath');

const getAllNpmDependencies = (): string[] => {
  const allNpmDependencies: string[] = [];
  const npmMapping = DependencyMapping.getAllMapping();
  npmMapping.forEach((deps) => {
    deps.forEach((dep) => {
      if (allNpmDependencies.includes(dep)) { return; }
      allNpmDependencies.push(dep);
    });
  });

  return allNpmDependencies;
};

const writeEntryFile = (entryFilePath: string): Promise<null> => {
  return new Promise((resolve, reject) => {
    writeFile(entryFilePath, getAllNpmDependencies().join('\n'), (err) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
};

const getWebpackDist = () => {
  return join(
    isProd() ? paths.appPublic : paths.appDebug,
    projectVirtualPath,
    'lib'
  );
};

export const compileNpm = async (webpackConfig: Configuration) => {
  const newWebpackConfig = Object.assign({}, webpackConfig, {
    entry: paths.appNpmMappings,
    output: {
      filename: 'bundle.js',
      path: getWebpackDist()
    }
  });

  await writeEntryFile(paths.appNpmMappings);

  return new Promise((resolve) => {
    vfs.src(paths.appNpmMappings)
      .pipe(plumber(handleErros))
      .pipe(webpackStream(newWebpackConfig, webpack as any, () => {}))
      .pipe(getDest(vfs, 'lib'))
      .on('end', resolve);
  });
};