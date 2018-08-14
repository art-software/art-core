import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';

export class WebpackDevConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry) {
    super(entry);
  }

  public devtool = '#source-map' as '#source-map';

  public plugins = super.plugins.concat(
    new MiniCssExtractPlugin({
      filename: `./[name]/bundle.css`
    }),
    new webpack.HotModuleReplacementPlugin()
  );
}