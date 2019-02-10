import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from './paths';
import HappyPack from 'happypack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const configBasePlugins = (() => {
  const plugins = [
    new ProgressBarPlugin({
      format: chalk.cyan('build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]',
      chunkFilename: '[id]'
    }),

    // new HappyPack({
    //   id: 'js',
    //   threads: 3,
    //   loaders: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: [
    //           '@babel/preset-env'
    //         ]
    //       }
    //     }
    //   ],
    // }),

    // new HappyPack({
    //   id: 'ts',
    //   threads: 3,
    //   loaders: [
    //     {
    //       loader: 'ts-loader',
    //       options: {
    //         transpileOnly: true,
    //         silent: false,
    //         happyPackMode: true
    //       }
    //     }
    //   ]
    // }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLintConfig
    }),
  ];

  return plugins;
})();