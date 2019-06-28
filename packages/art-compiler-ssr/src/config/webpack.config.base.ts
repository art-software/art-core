import { Configuration } from 'webpack';
import { isProd } from '../utils/env';

export class WebpackBaseConfig implements Configuration {

  constructor(entry, output) {
    this.entry = entry;
    this.output = output;
  }

  public entry: any;

  public output: any;

  public mode = isProd() ? 'production' as 'production' : 'development' as 'development';
}