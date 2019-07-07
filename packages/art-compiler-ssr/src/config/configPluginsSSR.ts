import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from './paths';
import HappyPack from 'happypack';
import DynamicChunkNamePlugin from '../plugins/DynamicChunkNamePlugin';
import { webpackEntries } from './configWebpackModules';

const getRawModuleEntry = (entries) => {
  for (const key in entries) {
    entries[key] = entries[key].slice(1);
  }
  return entries;
};

export const configPluginsSSR = (() => {
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
    }),

    new DynamicChunkNamePlugin(
      getRawModuleEntry(webpackEntries(false))
    )
  ];

  return plugins;
})();