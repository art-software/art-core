import { RuleSetUse, RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import { isProd } from '../utils/env';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import appConfig from './appConfig';
const projectVirtualPath = appConfig.get('art:projectVirtualPath');

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

export const cssRule = (isProdEnv: boolean, isSSR?: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } }
  ];

  if (!isProdEnv) {
    config.unshift('css-hot-loader');
  }

  if (!isSSR) {
    config.unshift(MiniCssExtractPlugin.loader);
  }

  config.unshift('isomorphic-style-loader');

  return {
    test: /\.css$/i,
    use: config
  };
};

export const lessRule = (isProdEnv: boolean, isSSR?: boolean): RuleSetRule => {

  const config: RuleSetUse = [
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } },
    { loader: 'venus-px2rem-loader', options: { remUnit: 100, remPrecision: 8 } },
    { loader: 'less-loader', options: { sourceMap: !isProdEnv } }
  ];

  if (!isProdEnv) {
    config.unshift('css-hot-loader');
  }

  if (!isSSR) {
    config.unshift(MiniCssExtractPlugin.loader);
  }

  config.unshift('isomorphic-style-loader');

  return {
    test: /\.less$/i,
    use: config
  };
};

export const sassRule = (isProdEnv: boolean, isSSR?: boolean): RuleSetRule => {
  const config: RuleSetUse = [
    { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
    { loader: 'postcss-loader', options: { config: { path: __dirname } } },
    { loader: 'sass-loader', options: { sourceMap: !isProdEnv } }
  ];

  if (!isProdEnv) {
    config.unshift('css-hot-loader');
  }

  if (!isSSR) {
    config.unshift(MiniCssExtractPlugin.loader);
  }

  config.unshift('isomorphic-style-loader');

  return {
    test: /\.scss$/i,
    use: config
  };
};

export const htmlRule: RuleSetRule = {
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

export const assetsRule: RuleSetRule = {
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

export const assetsRuleSSR = (): RuleSetRule => {
  const argv = process.argv;
  const envName = argv[argv.indexOf('--NODE_ENV') + 1];
  const port = argv[argv.indexOf('--DEV_PORT') + 1];
  const host = ensureSlash(appConfig.get(`devHost:${envName}`), false);
  const output = appConfig.get(`art:webpack:output`) || {};
  const buildEnv = appConfig.get('BUILD_ENV');
  const publicPath = isProd() ? output[`${buildEnv}PublicPath`] : `${host}:${port}/public/`;
  // const publicPath = `${host}:${port}/public/`;
  return {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5000,
          context: path.resolve(process.cwd(), './client'),
          name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`,
          publicPath,
          emitFile: false
        }
      }
    ]
  };
};

export const fontRule: RuleSetRule = {
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

export const jsRule: RuleSetRule = {
  test: /\.(js|jsx)$/,
  use: [
    { loader: 'happypack/loader?id=jsx' }
  ],
  exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-utils-wx|art-lib-common)\/).*/
};

export const tsRule: RuleSetRule = {
  test: /\.(ts|tsx)$/,
  use: [
    { loader: 'happypack/loader?id=jsx' },
    { loader: 'happypack/loader?id=ts' }
  ],
  exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-utils-wx|art-lib-common)\/).*/
};

export const nullRule: RuleSetRule = {
  test: /\.(ttf|eot|woff|woff2)$/,
  use: 'null-loader'
};