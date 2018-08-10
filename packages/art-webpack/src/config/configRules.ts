import { RuleSetUse, RuleSetRule } from '../../../../node_modules/@types/webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';

const isProdEnv = process.env.NODE_ENV === 'production';

export const configBaseRules = (): RuleSetRule[] => {
  const config: RuleSetRule[] = [];

  config.push(cssRule(isProdEnv));
  config.push(lessRule(isProdEnv));
  config.push(sassRule(isProdEnv));
  config.push(htmlRule);

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
        // name: 
      }
    }
  ]
};