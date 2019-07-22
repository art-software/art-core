import { Configuration } from 'webpack';
import { isProd } from '../utils/env';
import { jsRule, tsRule, nullRule, htmlRule, assetsRuleSSR } from './configRules';
import { getConfigPluginsSSR } from './configPluginsSSR';

export class WebpackBaseConfigSSR implements Configuration {

  constructor(entry, output) {
    this.entry = entry;
    this.output = output;
  }

  public entry: any;

  public target = 'node' as 'node';

  public stats = 'errors-only' as 'errors-only';

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
  };

  public module = {
    rules: [ jsRule, tsRule, nullRule, htmlRule, assetsRuleSSR() ]
  };

  public output: any;

  public mode = isProd() ? 'production' as 'production' : 'development' as 'development';

  public plugins = getConfigPluginsSSR();
}