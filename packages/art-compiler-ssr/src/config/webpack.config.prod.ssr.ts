import { WebpackBaseConfigSSR } from './webpack.config.base.ssr';
import { Configuration } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default class WebpackProdConfigSSR extends WebpackBaseConfigSSR implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public plugins = this.plugins.concat(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      // set to true if you want JS source maps
      sourceMap: false,
      uglifyOptions: {
        compress: {
          warnings: true,
          dead_code: true,
          drop_debugger: true,
          drop_console: true
        }
      }
    }),

    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { 'postcss-discard-unused': false }
    })
  );

}