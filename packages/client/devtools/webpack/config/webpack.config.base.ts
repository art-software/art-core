import * as webpack from 'webpack';
import * as path from 'path';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackMd5Hash from 'webpack-md5-hash';
const nconf =  require('../../config/config');

const env = process.env['NODE_ENV'] || 'production';
const isProdEnv = env === 'production';

const config: webpack.Configuration = {
  entry: {
    'playground': './src/modules/playground/index.js'
  },
  target: 'node',
  output: {
    path: nconf.get('paths:dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      { test:  /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist/*.*', {
      root: nconf.get('paths:clientRoot'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(nconf.get('paths:src'), './modules/playground/index.html'),
      filename: 'index.html',
      hash: true
    }),
    new WebpackMd5Hash()
  ]
};

export default config;