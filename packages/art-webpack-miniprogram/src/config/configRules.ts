import { RuleSetUse, RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import appConfig from './appConfig';
import * as path from 'path';
import { isProd } from '../utils/env';
const projectVirtualPath = appConfig.get('art:projectVirtualPath');

const prod = isProd();

export const configBaseRules = (): RuleSetRule[] => {
  let config: RuleSetRule[] = [];

  config = config.concat([
    cssRule(prod),
    lessRule(prod),
    sassRule(prod),
    assetsRule,
    fontRule,
    // jsRule,
    // tsRule
  ]);

  return config;
};

const cssRule = (isProdEnv: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } }
  ];

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
    { loader: 'less-loader', options: { sourceMap: !isProdEnv } }
  ];

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

  return {
    test: /\.scss$/i,
    use: config
  };
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
        context: path.resolve(process.cwd(), './client'),
        name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`
      }
    }
  ]
};

const jsRule: RuleSetRule = {
  test: /\.(js)$/,
  use: [
    // { loader: 'happypack/loader?id=js' }
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env'
        ]
      }
    }
  ],
  // TODO
  exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-common)\/).*/
};

const tsRule: RuleSetRule = {
  test: /\.(ts)$/,
  use: [
    // { loader: 'happypack/loader?id=ts' }
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        silent: false,
        happyPackMode: false
      }
    }
  ],
  // TODO
  exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-common)\/).*/
};