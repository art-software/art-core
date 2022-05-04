import { WebpackBaseConfigWeb } from './webpack.config.base.web';
import { Configuration } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import appConfig from './appConfig';
import ChunkHashOutputPlugin from '../plugins/webpack-plugin-chunkhash-output';
const enableBundleHashName = appConfig.get('enableBundleHashName');
const version = appConfig.get('art:version');

export default class WebpackProdConfigWeb extends WebpackBaseConfigWeb implements Configuration {
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
    }),

    // new MiniCssExtractPlugin({
    //   filename: `[name]/${bundleFileNamePattern('.css')}`
    // }),

    new MiniCssExtractPlugin({
      filename: `./[name]/bundle.css`,
      chunkFilename: `${Object.keys(this.entry)[0]}/[id].[chunkhash].css`,
    }),

    new ChunkHashOutputPlugin({
      validateOutput: false,
      version,
      enableBundleHashName,
      validateOutputRegex: /bundle.*\.(js|css)/
    })
  );

}