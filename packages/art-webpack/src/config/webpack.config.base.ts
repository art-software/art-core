import { Configuration } from 'webpack';
import { configBaseRules } from './configRules';
import { configBasePlugins } from './configPlugins';

export class WebpackBaseConfig implements Configuration {

  constructor(entry) {
    this.entryModules = entry;
  }

  private entryModules: string;

  private readonly isProd = process.env.NODE_ENV === 'production';

  public mode = this.isProd ? 'production' as 'production' : 'development' as 'development';

  public entry = [];

  public resolve = {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  };

  public module = {
    rules : configBaseRules()
  };

  public plugins = configBasePlugins;
}