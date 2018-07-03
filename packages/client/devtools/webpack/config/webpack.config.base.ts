import * as webpack from 'webpack';
import * as HappyPack from 'happypack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import * as path from 'path';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as WebpackMd5Hash from 'webpack-md5-hash';
const nconf = require('../../config/config');

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV || 'development');

const baseConfig: webpack.Configuration = {
  mode: ifProduction() ? 'production' : 'development',

  entry: {
    'modules/playground': './src/modules/playground/index'
  },

  output: {
    filename: '[name]/bundle.js',
    path: path.resolve(__dirname, '../../../dist/'),
    publicPath: ifProduction() ? 'public/cdn/path/' : '/dist/'
  },

  devtool: ifNotProduction('eval-source-map'),

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  },

  devServer: ifNotProduction({
    port: 9999,
    contentBase: '/dist/',
    compress: true,
    clientLogLevel: 'none',
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    publicPath: '/dist/',
    // Reportedly, this avoids CPU overload on some systems.
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 2000
    }
  }),

  module: {
    rules: [
      { test: /\.less$/i, use: 'happypack/loader?id=lessStyle' },
      { test: /\.(js|jsx)$/, loader: 'happypack/loader?id=js', exclude: /(node_modules|bower_components)/ },
      { test: /\.(ts|tsx)$/, use: 'happypack/loader?id=ts', exclude: /(node_modules|bower_components)/ },
    ]
  },

  plugins: removeEmpty([
    new HappyPack({
      id: 'ts', threads: 4,
      loaders: [
        { path: 'babel-loader' },
        { path: 'ts-loader', query: { happyPackMode: true } }
      ]
    }),
    new HappyPack({
      id: 'js', threads: 4,
      loaders: [{ path: 'babel-loader' }]
    }),
    new HappyPack({
      id: 'lessStyle', threads: 4,
      loaders: removeEmpty([
        ifProduction({
          path: MiniCssExtractPlugin.loader
        }),
        ifNotProduction({
          path: 'style-loader', query: {
            sourceMap: !ifProduction(),
            hmr: !ifProduction()
          }
        }),
        {
          path: 'css-loader', query: {
            sourceMap: !ifProduction(),
            minimize: ifProduction()
          }
        },
        { path: 'less-loader', query: { sourceMap: !ifProduction() } }
      ])
    }),
    ifProduction(
      new MiniCssExtractPlugin({
        filename: `./[name]/bundle.css`
      })
    ),
    new CleanWebpackPlugin('dist/*.*', {
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(nconf.get('paths:src'), './modules/playground/index.html'),
      filename: 'modules/playground/index.html',
      hash: true
    }),
    new WebpackMd5Hash(),
    new ForkTsCheckerWebpackPlugin({ tslint: true, checkSyntacticErrors: true })
  ])
};

export default baseConfig;