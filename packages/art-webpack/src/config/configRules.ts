import { RuleSetUse, RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import appNconf from './appConfig';
import * as path from 'path';
const projectVirtualPath = appNconf.get('art:projectVirtualPath');

const isProdEnv = process.env.NODE_ENV === 'production';

export const configBaseRules = (): RuleSetRule[] => {
  const config: RuleSetRule[] = [];

  config.push(cssRule(isProdEnv));
  config.push(lessRule(isProdEnv));
  config.push(sassRule(isProdEnv));
  config.push(htmlRule);
  config.push(assetsRule);
  config.push(fontRule);
  config.push(jsRule);
  config.push(tsRule);

  return config;
};

const cssRule = (isProd: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProd } }
  ];

  if (!isProd) {
    config.unshift('css-hot-loader');
  }

  return {
    test: /\.css$/i,
    use: config
  };
};

const lessRule = (isProd: boolean): RuleSetRule => {

  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProd } },
    { loader: 'venus-px2rem-loader', options: { remUnit: 100, remPrecision: 8 } },
    { loader: 'less-loader', options: { sourceMap: !isProd } }
  ];

  if (!isProd) {
    config.unshift('css-hot-loader');
  }

  return {
    test: /\.less$/i,
    use: config
  };
};

const sassRule = (isProd: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProd } },
    { loader: 'sass-loader', options: { sourceMap: !isProd } }
  ];

  if (!isProd) {
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
    { loader: 'file-loader', options: { name: '[hash:8].[ext]' } }
  ]
};

const jsRule: RuleSetRule = {
  test: /\.(js|jsx)$/,
  use: [
    { loader: 'babel-loader' }
  ]
};

const tsRule: RuleSetRule = {
  test: /\.(ts|tsx)$/,
  use: [
    { loader: 'babel-loader' },
    { loader: 'ts-loader',  options: { transpileOnly: true, silent: true } }
  ]
};