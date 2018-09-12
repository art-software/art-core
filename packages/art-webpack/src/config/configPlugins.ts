import { Tapable } from 'tapable';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from './paths';
import { webpackEntries } from './configWebpackModules';
import appConfig from './appConfig';
import * as path from 'path';
import * as fs from 'fs';
import qs from 'qs';
import foreach from 'lodash/foreach';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackCDNPlugin from '../plugins/HtmlWebpackCDNPlugin';
import HappyPack from 'happypack';

const envName = process.env.NODE_ENV || 'development';
const isProd = envName === 'production';

const configHtmlWebpackPlugin = (entries?: object): any[] => {
  const plugins: any[] = [];
  const newEntries = entries || webpackEntries(false);
  const projectVirtualPath = appConfig.get('art:projectVirtualPath') || '';
  const assetsProdPublicPath = appConfig.get('art:webpack:output:publicPath') || '';
  const defaultTempleate = path.join(__dirname, '../../index.template.ejs');

  foreach(newEntries, (value, key) => {
    const fragment = key.split('?');
    const entryKey = fragment[0];
    const queryKey = fragment[1];
    const queryObj = qs.parse(queryKey);
    const myTemplate = path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''), 'index.template.ejs');
    const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
      chunks: [entryKey],
      minify: isProd ? {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      } : false,
      template: fs.existsSync(myTemplate) ? myTemplate : defaultTempleate,
      title: queryObj.title || '',
      cdnPath: (queryObj.cdn === '0' || queryObj.cdn === 'false' || !isProd) ? '' : assetsProdPublicPath,
      filename: `${entryKey}/${queryObj.template || 'index.html'}`
    };

    plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));
  });

  plugins.push(new HtmlWebpackCDNPlugin());

  return plugins;
};

export const configBasePlugins = (() => {
  const plugins = [
    new ProgressBarPlugin({
      format: chalk.cyan('build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new HappyPack({
      id: 'jsx',
      threads: 3,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
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
  ];
  if (isProd) {
    plugins.concat(configHtmlWebpackPlugin());
  }

  return plugins;
})();