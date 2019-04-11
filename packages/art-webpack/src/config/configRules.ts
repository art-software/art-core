import { RuleSetUse, RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import appNconf from './appConfig';
import * as path from 'path';
import { isProd } from '../utils/env';
const projectVirtualPath = appNconf.get('art:projectVirtualPath');

const prod = isProd();

export const configBaseRules = (): RuleSetRule[] => {
  let config: RuleSetRule[] = [];

  config = config.concat([
    cssRule(prod),
    lessRule(prod),
    sassRule(prod),
    htmlRule,
    assetsRule,
    fontRule,
    jsRule,
    tsRule
  ]);

  return config;
};

const cssRule = (isProdEnv: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } }
  ];

  if (!isProdEnv) {
    config.unshift('css-hot-loader');
  }

  return {
    test: /\.css$/i,
    use: config
  };
};

const lessRule = (isProdEnv: boolean): RuleSetRule => {

  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } },
    { loader: 'venus-px2rem-loader', options: { remUnit: 100, remPrecision: 8 } },
    { loader: 'less-loader', options: { sourceMap: !isProdEnv } }
  ];

  if (!isProdEnv) {
    config.unshift('css-hot-loader');
  }

  return {
    test: /\.less$/i,
    use: config
  };
};

const sassRule = (isProdEnv: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } },
    { loader: 'sass-loader', options: { sourceMap: !isProdEnv } }
  ];

  if (!isProdEnv) {
    config.unshift('css-hot-loader');
  }

  return {
    test: /\.scss$/i,
    use: config
  };
};

const htmlRule: RuleSetRule = {
  test: /\.html$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        minimize: true,
        attrs: ['img:src', 'img:data-original', 'div:data-original']
      }
    }
  ]
};

const assetsRule: RuleSetRule = {
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 5000,
        context: path.resolve(process.cwd(), './client'),
        name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`
      }
    }
  ]
};

const fontRule: RuleSetRule = {
  test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
  use: [
    {
      loader: 'file-loader', options: {
        // name: '[hash:8].[ext]'
        context: path.resolve(process.cwd(), './client'),
        name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`
      }
    }
  ]
};

const jsRule: RuleSetRule = {
  test: /\.(js|jsx)$/,
  use: [
    { loader: 'happypack/loader?id=jsx' }
  ],
  exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-utils-wx|art-lib-common)\/).*/
};

const tsRule: RuleSetRule = {
  test: /\.(ts|tsx)$/,
  use: [
    { loader: 'happypack/loader?id=jsx' },
    { loader: 'happypack/loader?id=ts' }
  ],
  exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-utils-wx|art-lib-common)\/).*/
};