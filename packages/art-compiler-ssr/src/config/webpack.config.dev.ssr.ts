import { WebpackBaseConfigSSR } from './webpack.config.base.ssr';
import { Configuration } from 'webpack';
// import { getConfigPluginsSSR } from './configPluginsSSR';

export default class WebpackDevSSRConfig extends WebpackBaseConfigSSR implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public devtool = '#source-map' as '#source-map';

  // public plugins = getConfigPluginsSSR();
}