import { Configuration } from 'webpack';
import { isProd } from '../utils/env';
import { configBaseRules } from './configRules';
import { getConfigPluginsWeb } from './configPluginsWeb';

export class WebpackBaseConfigWeb implements Configuration {

  constructor(entry, output) {
    this.entry = entry;
    this.output = output;
  }

  public entry: any;

  public stats = 'errors-only' as 'errors-only';

  public output: any;

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html', '.less', '.css']
  };

  public module = {
    rules: configBaseRules()
  };

  public plugins = getConfigPluginsWeb();

  public mode = isProd() ? 'production' as 'production' : 'development' as 'development';

  public optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: false as any
      }
    }
  };
}