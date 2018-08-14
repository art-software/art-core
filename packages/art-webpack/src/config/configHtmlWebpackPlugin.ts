import { webpackEntries } from './configWebpackModules';
import appConfig from './appConfig';
import * as path from 'path';
import * as fs from 'fs';
import qs from 'qs';
import foreach from 'lodash/foreach';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackCDNPlugin from '../plugins/HtmlWebpackCDNPlugin';

const envName = process.env.NODE_ENV || 'development';
const isProd = envName === 'production';

const configHtmlWebpackPlugin = (entries?: object) => {
  const plugins: any[] = [];
  const newEntries = entries || webpackEntries(false);
  const projectVirtualPath = appConfig.get('art:projectVirtualPath') || '';
  const assetsProdPublicPath = appConfig.get('art:webpack:output:publicPath') || '';
  const defaultTempleate = path.join(__dirname, '../plugins/index.template.ejs');

  foreach(newEntries, (value, key) => {
    const fragment = key.split('?');
    const entryKey = fragment[0];
    const queryKey = fragment[1];
    const queryObj = qs.parse(queryKey);
    const myTemplate = path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''), 'index.template.ejs');
    const htmlWebpackPluginOptions: HtmlWebpackPlugin.Options = {
      chunks: [entryKey],
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true
      },
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

export default configHtmlWebpackPlugin;