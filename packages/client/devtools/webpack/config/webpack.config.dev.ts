import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HappyPack from 'happypack';
import baseConfig from './webpack.config.base';
import * as merge from 'webpack-merge';

const config: webpack.Configuration = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'happypack/loader?id=style' }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'happypack/loader?id=style' }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'style',
      threads: 4,
      loaders: [{ path: 'style-loader', query: { sourceMap: true, hmr: true } }]
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    })
  ]
};

const devConfig = merge(baseConfig, config);

console.log(devConfig);

export default devConfig;