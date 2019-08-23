import { Configuration } from 'webpack';
import { isProd } from '../utils/env';
import { jsRule, tsRule, nullRule, htmlRule, assetsRuleSSR, cssRule, lessRule, sassRule } from './configRules';
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
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less', '.css']
  };

  public module = {
    rules: [jsRule, tsRule, cssRule(isProd(), true), lessRule(isProd(), true), sassRule(isProd(), true),
      nullRule, htmlRule, assetsRuleSSR()]
  };

  public output: any;

  public mode = isProd() ? 'production' as 'production' : 'development' as 'development';

  public plugins = getConfigPluginsSSR();
}