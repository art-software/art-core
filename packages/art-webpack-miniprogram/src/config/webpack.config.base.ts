import { Configuration } from 'webpack';
import { configBaseRules } from './configRules';
import { configBasePlugins } from './configPlugins';
import { isProd } from '../utils/env';

export class WebpackBaseConfig implements Configuration {

  constructor(entry, output) {
    this.entry = entry;
    this.output = output;
  }

  public entry: any;

  public output: any;

  public mode = isProd() ? 'production' as 'production' : 'development' as 'development';

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.ts', '.json', '.html']
  };

  public module = {
    rules : configBaseRules()
  };

  public plugins = configBasePlugins;
}