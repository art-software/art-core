import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import paths from './paths';
import { webpackEntries, webpackOutput } from './configWebpackModules';
import appConfig from './appConfig';
import * as path from 'path';
import * as fs from 'fs';
import qs from 'qs';
import foreach from 'lodash/foreach';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackCDNPlugin from '../plugins/HtmlWebpackCDNPlugin';
import HappyPack from 'happypack';
import { isProd } from '../utils/env';
import DynamicChunkNamePlugin from '../plugins/DynamicChunkNamePlugin';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const enableSW = appConfig.get('art:sw:enable');
const envName = appConfig.get('NODE_ENV');
const isProdEnv = isProd();

const configHtmlWebpackPlugin = (entries?: object): any[] => {
  const plugins: any[] = [];
  const newEntries = entries || webpackEntries(false);
  const projectVirtualPath = appConfig.get('art:projectVirtualPath') || '';
  const buildEnv = appConfig.get('BUILD_ENV');
  console.log(`art:webpack:output:${buildEnv}PublicPath`);
  const assetsProdPublicPath = appConfig.get(`art:webpack:output:${buildEnv}PublicPath`) || '';
  console.log(`assetsProdPublicPath: ${assetsProdPublicPath}`);

  foreach(newEntries, (value, key) => {
    const fragment = key.split('?');
    const entryKey = fragment[0];
    const queryKey = fragment[1];
    const queryObj = qs.parse(queryKey);
    const myTemplate = path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''), 'index.template.ejs');
    if (!fs.existsSync(myTemplate)) {
      throw new Error(chalk.red.bold('Sorry, it\'s a breaking change from art-webpack@0.0.22' +
        ' no default template file provided any more, please put template file within module root folder.'));
    }
    const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
      chunks: [entryKey],
      minify: isProdEnv ? {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      } : false,
      template: myTemplate,
      filename: `${entryKey}/${queryObj.template || 'index.html'}`,

      // customized template variables
      buildEnv,
      title: queryObj.title || '',
      publicPath: assetsProdPublicPath,
      cdnPath: (queryObj.cdn === '0' || queryObj.cdn === 'false' || !isProdEnv) ? '' : assetsProdPublicPath
    };

    plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));
  });

  plugins.push(new HtmlWebpackCDNPlugin());

  return plugins;
};

const configWorkboxWebpackPlugin = (): any[] => {
  const host = ensureSlash(appConfig.get(`devHost:${envName}`), false);
  const port = appConfig.get(`devPort:${envName}`);
  const output = appConfig.get(`art:webpack:output`) || {};
  const publicPath = isProdEnv ? output[`${appConfig.get('BUILD_ENV')}PublicPath`] : `${host}:${port}/public/`;
  const webpackOutputPath = webpackOutput().path;
  const artConfigWorkboxGenerateSWOptions = appConfig.get('art:sw:workboxGenerateSWOptions') || {};

  const plugins: any[] = [];

  const newEntries = webpackEntries(false);
  foreach(newEntries, (value, entryKey) => {
    const importScripts: string[] = [];
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(process.cwd(), './service-worker/workbox-index.js'),
          to: ensureSlash(webpackOutputPath, true) + `${entryKey}/[name].[hash].[ext]`,
          transformPath(targetPath, absolutePath) {
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
          exclude: [new RegExp(`^(?!.*${entryKey}).*$`)], // 多模块同时编译时，排除非当前模块需要缓存的文件
          importsDirectory: entryKey, // assets存放的路径，相对于output.path
          importWorkboxFrom: 'disabled',
          importScripts,
          skipWaiting: true,
          clientsClaim: true,
          navigateFallback: ensureSlash(publicPath + entryKey, true) + 'index.html'
        }, artConfigWorkboxGenerateSWOptions)
      )
    );
  });

  return plugins;
};

const getRawModuleEntry = (entries) => {
  for (const key in entries) {
    entries[key] = entries[key].slice(1);
  }
  return entries;
};

export const configBasePlugins = (() => {
  let plugins = [
    new ProgressBarPlugin({
      format: chalk.cyan('build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    // new MiniCssExtractPlugin({
    //   chunkFilename: '[id].[chunkhash].css'
    // }),

    new HappyPack({
      id: 'jsx',
      threads: 3,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      ],
    }),

    new HappyPack({
      id: 'ts',
      threads: 3,
      loaders: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            silent: false,
            happyPackMode: true
          }
        }
      ]
    }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLintConfig
    }),

    new DynamicChunkNamePlugin(
      getRawModuleEntry(webpackEntries(false))
    )

  ];
  if (isProdEnv) {
    plugins = plugins.concat(configHtmlWebpackPlugin());
    if (enableSW) {
      plugins = plugins.concat(configWorkboxWebpackPlugin());
    }
  }

  return plugins;
})();