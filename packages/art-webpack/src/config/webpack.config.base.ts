import { Configuration } from '../../../../node_modules/@types/webpack';

export class WebpackBaseConfig implements Configuration {

  constructor(entry) {
    this.entryModules = entry;
  }

  private entryModules: string;

  private isProd = process.env.NODE_ENV === 'production';

  public mode = this.isProd ? 'production' as 'production' : 'development' as 'development';

  public entry = [];

  public resolve = {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  };

  // public module = {
  // };
}