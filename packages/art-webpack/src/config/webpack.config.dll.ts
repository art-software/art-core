import webpack, { Configuration } from 'webpack';
import { join } from 'path';
import paths from './paths';
import { resolve } from 'path';
import { existsSync } from 'fs';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
const version = '20180901';
const defaultVendor = join(paths.appCwd, 'node_modules/art-lib-react/dist/vendors');
const vendorPath = existsSync(defaultVendor) ? defaultVendor : join(__dirname, '../../../art-lib-react/dist/vendors');

const vendors = [
  'polyfills',
  'react',
  'react-dom',
  'react-router-dom',
  'classnames',
  'axios',
  'art-lib-react/src/components/scroll/lib/iscroll-probe'
];
export default class WebpackDLLConfig implements Configuration {

  public mode = 'production' as 'production';

  public entry = {
    shared: vendors
  };

  public output = {
    path: vendorPath,
    filename: `art_framework.${version}.js`,
    library: `[name]_${version}`
  };

  public resolve = {
    alias: {
      lib: 'art-lib-react',
      polyfills: resolve(__dirname, '../config/polyfills.js')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  };

  public module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env']} }
        ]
      },
      {
        test: /\.(ts|tsx)$/, use: [
          { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env']} },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              silent: true,
              configFile: join(__dirname, '../../tsconfig.dll.json'),
              allowTsInNodeModules: true
            }
          }
        ]
      }
    ]
  };

  public plugins = [
    new OptimizeCSSAssetsPlugin(),
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
    new webpack.DllPlugin({
      path: join(vendorPath, 'manifest.json'),
      name: `[name]_${version}`,
      context: join(paths.appCwd)
    })
  ];

}