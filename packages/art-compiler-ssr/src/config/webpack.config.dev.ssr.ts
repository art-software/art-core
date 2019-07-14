import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';
import { jsRule, tsRule, nullRule, htmlRule, assetsRuleSSR } from './configRules';
import { getConfigPluginsSSR } from './configPluginsSSR';

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
    rules: [ jsRule, tsRule, nullRule, htmlRule, assetsRuleSSR() ]
  };

  public plugins = getConfigPluginsSSR();
}