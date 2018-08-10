import { Configuration } from '../../../../node_modules/@types/webpack';

export class WebpackBaseConfig implements Configuration {

  constructor(entry) {
    this.entryModules = entry;
  }

  private entryModules: string;

  private readonly isProd = process.env.NODE_ENV === 'production';

  public mode = this.isProd ? 'production' as 'production' : 'development' as 'development';

  public entry = [];

  public resolve = {
    extensions: ['.js', '.json', '.html']
  };

  public module = {
    rules : this.configRules()
  };

  public configRules () {
    const config: any[] = [];
    // config.push()
    return [];
  }
}