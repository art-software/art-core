import path from 'path';
import foreach from 'lodash/foreach';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import appConfig from './appConfig';
import { webpackEntries, webpackOutput } from './configWebpackModules';
import { isProd } from '../utils/env';

const isProdEnv = isProd();
const nodeEnv = appConfig.get('NODE_ENV');
const buildEnv = appConfig.get('BUILD_ENV');
const enableSW = appConfig.get('art:sw:enable');

const transformModulesToEntries = (modules: string[]) => {
  let transformedEntries: object;
  if (Array.isArray(modules) && modules.length > 0) {
    const projectVirtualPath = appConfig.get('art:projectVirtualPath');
    const entryKeys = modules.map((module) => `${projectVirtualPath}/${module}`);
    const entries = webpackEntries(false);
    const includeEntries = {};
    entryKeys.forEach((entryKey) => {
      includeEntries[entryKey] = entries[entryKey];
    });
    transformedEntries = includeEntries;
  } else {
    transformedEntries = webpackEntries(false);
  }
  return transformedEntries;
};

const configWorkboxWebpackPlugin = (): any[] => {
  const plugins: any[] = [];
  if (!enableSW) { return plugins; }

  const host = ensureSlash(appConfig.get(`devHost:${nodeEnv}`), false);
  const port = appConfig.get(`devPort:${nodeEnv}`);
  const output = appConfig.get('art:webpack:output') || {};
  const publicPath = isProdEnv ? output[`${buildEnv}PublicPath`] : `${host}:${port}/public/`;
  const webpackOutputPath = webpackOutput().path;
  const artConfigWorkboxOutputDirectory = appConfig.get('art:sw:workboxOutputDirectory') || '';
  const artConfigWorkboxGenerateSWOptions = appConfig.get('art:sw:workboxGenerateSWOptions') || {};

  // 只对需要使用service worker的模块生成service worker文件
  const includeModules = appConfig.get('art:sw:includeModules');
  const newEntries = transformModulesToEntries(includeModules);

  foreach(newEntries, (value, entryKey) => {
    const importScripts: string[] = [];
    const importsDirectory = ensureSlash(`${entryKey}/${artConfigWorkboxOutputDirectory}`, false);
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(process.cwd(), './service-worker/workbox-index.js'),
          to: ensureSlash(webpackOutputPath, true) + `${importsDirectory}/[name].[hash].[ext]`,
          transform(content: Buffer, originalPath: string) {
            const fileContent = content.toString('utf8');
            const moduleName = entryKey.slice(entryKey.lastIndexOf('/') + 1);
            const replacedFileContent = fileContent.replace('<module>', moduleName);
            const transformedContent = Buffer.from(replacedFileContent, 'utf8');
            return Promise.resolve(transformedContent);
          },
          transformPath(targetPath: string, absolutePath: string) {
            importScripts.push(publicPath + targetPath);
            return Promise.resolve(targetPath);
          }
        }
      ]),
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the Webpack build.
      new WorkboxWebpackPlugin.GenerateSW(
        Object.assign({}, {
          swDest: `${entryKey}/service-worker.js`, // 输入路径相对于output.path
          exclude: [new RegExp(`^(?!.*${entryKey}).*$`), new RegExp(importsDirectory)], // 多模块同时编译时，排除非当前模块的文件，另外在service worker线程加载的文件不需要precache
          importsDirectory, // 存放precache-manifest.js的路径，相对于output.path
          importScripts, // 额外需要import的脚本
          importWorkboxFrom: 'disabled',
          skipWaiting: false,
          clientsClaim: true,
          cleanupOutdatedCaches: false, // workbox版本更新的时候(如v3->v4)是否清除旧版本的precache资源
          navigateFallback: ensureSlash(publicPath + entryKey, true) + 'index.html'
        }, artConfigWorkboxGenerateSWOptions)
      )
    );
  });

  return plugins;
};

export default configWorkboxWebpackPlugin;