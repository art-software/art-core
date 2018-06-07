import * as webpack from 'webpack';
import * as path from 'path';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackMd5Hash from 'webpack-md5-hash';
import * as HappyPack from 'happypack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const nconf = require('../../config/config');

const env = process.env.NODE_ENV || 'development';
const isProdEnv = env === 'production';

const baseConfig: webpack.Configuration = {
  entry: {
    playground: './src/modules/playground/index'
  },
  output: {
    path: nconf.get('paths:dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=js'
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          { loader: 'happypack/loader?id=ts' }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'ts',
      threads: 4,
      loaders: [
        { path: 'babel-loader' },
        { path: 'ts-loader', query: { happyPackMode: true } }
      ]
    }),
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: [{ path: 'babel-loader' }]
    }),
    new CleanWebpackPlugin('dist/*.*', {
      root: nconf.get('paths:clientRoot'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(nconf.get('paths:src'), './modules/playground/index.html'),
      filename: 'index.html',
      hash: true
    }),
    new WebpackMd5Hash(),
    new ForkTsCheckerWebpackPlugin({ tslint: true, checkSyntacticErrors: true })
  ]
};

export default baseConfig;