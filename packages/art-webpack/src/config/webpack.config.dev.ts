import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';

export default class WebpackDevConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public devtool = '#source-map' as '#source-map';

  public plugins = this.plugins.concat(
    new MiniCssExtractPlugin({
      filename: `./[name]/bundle.css`
    }),
    // new webpack.HotModuleReplacementPlugin()
  );
}