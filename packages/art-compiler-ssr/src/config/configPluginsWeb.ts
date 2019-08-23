import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from './paths';
import HappyPack from 'happypack';

export const getConfigPluginsWeb = () => {
  const plugins = [
    new ProgressBarPlugin({
      format: chalk.cyan('build') + ' [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new HappyPack({
      id: 'jsx',
      threads: 3,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      ],
    }),

    new HappyPack({
      id: 'ts',
      threads: 3,
      loaders: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            silent: false,
            happyPackMode: true
          }
        }
      ]
    }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLintConfig
    })

  ];
  // if (isProdEnv) {
  //   plugins = plugins.concat(configHtmlWebpackPlugin(entry));
  // }

  return plugins;
};