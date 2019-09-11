import { Configuration } from 'webpack';
import { configBaseRules } from './configRules';
import { configBasePlugins } from './configPlugins';
import { isProd } from '../utils/env';

export class WebpackBaseConfig implements Configuration {

  constructor(entry, output) {
    this.entry = entry;
    this.output = output;
    this.plugins = configBasePlugins(entry);
  }

  public entry: any;

  public output: any;

  public mode = isProd() ? 'production' as 'production' : 'development' as 'development';

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  };

  public module = {
    rules: configBaseRules()
  };

  public plugins: any;

  public optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: false as any
      }
    }
  };
}