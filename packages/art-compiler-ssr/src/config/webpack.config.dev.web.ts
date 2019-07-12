import webpack from 'webpack';
import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';
import { configBaseRules } from './configRules';
import { getConfigPluginsWeb } from './configPluginsWeb';

export default class WebpackDevConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  };

  public module = {
    rules: configBaseRules()
  };

  public devtool = '#source-map' as '#source-map';

  public plugins = getConfigPluginsWeb(this.entry).concat(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );

  public optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: false as any
      }
    }
  };
}