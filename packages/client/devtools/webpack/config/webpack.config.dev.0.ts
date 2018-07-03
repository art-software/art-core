import * as webpack from 'webpack';
import * as HappyPack from 'happypack';
import baseConfig from './webpack.config.base.0';
import * as merge from 'webpack-merge';
const nconf = require('../../config/config');

let devConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
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
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'happypack/loader?id=cssStyle' }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'happypack/loader?id=lessStyle' }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'cssStyle',
      threads: 4,
      loaders: [
        { path: 'style-loader', query: { sourceMap: true, hmr: true } },
        { path: 'css-loader', query: { sourceMap: true, minimize: false } }
      ]
    }),
    new HappyPack({
      id: 'lessStyle',
      threads: 4,
      loaders: [
        { path: 'style-loader', query: { sourceMap: true, hmr: true } },
        { path: 'css-loader', query: { sourceMap: true, minimize: false } },
        { path: 'less-loader', query: { sourceMap: true } }
      ]
    })
  ]
};

devConfig = merge(baseConfig, devConfig);

console.log(devConfig);

export default devConfig;