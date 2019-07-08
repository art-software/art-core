import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';
import { jsRule, tsRule } from './configRules';
import { getConfigPluginsSSR } from './configPluginsSSR';
const nodeExternals = require('webpack-node-externals');

export default class WebpackDevSSRConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public target = 'node' as 'node';

  public devtool = '#source-map' as '#source-map';

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
  };

  public module = {
    rules: [ jsRule, tsRule ]
  };

  public plugins = getConfigPluginsSSR(this.entry);

  public externals = [ nodeExternals() ];
}