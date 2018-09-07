import webpack from 'webpack';
import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import appConfig from './appConfig';
import ChunkHashOutputPlugin from '../plugins/webpack-plugin-chunkhash-output';
import paths from './paths';
import { join } from 'path';
import { existsSync } from 'fs';
const enableBundleHashName = appConfig.get('enableBundleHashName');
const version = appConfig.get('version');
const defaultVendor = join(paths.appCwd, 'node_modules/art-lib/dist/vendors');
const vendorPath = existsSync(defaultVendor) ? defaultVendor : join(__dirname, '../../../art-lib/dist/vendors');

function bundleFileNamePattern(endFix: string = '.js'): string {
  if (enableBundleHashName) {
    return `bundle[chunkhash]${endFix}`;
  }
  return `bundle${endFix}?${version}`;
}

export default class WebpackProdConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public plugins = this.plugins.concat(
    new webpack.DllReferencePlugin({
      context: join(paths.appCwd),
      manifest: join(vendorPath, 'manifest.json')
    }),

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
      cssProcessorOptions: { 'postcss-discard-unused': false }
    }),

    new MiniCssExtractPlugin({
      filename: `[name]/${bundleFileNamePattern('.css')}`
    }),

    new ChunkHashOutputPlugin({
      validateOutput: false,
      version,
      enableBundleHashName,
      validateOutputRegex: /bundle.*\.(js|css)/
    })
  );

}