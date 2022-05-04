import webpack from 'webpack';
import { WebpackBaseConfigWeb } from './webpack.config.base.web';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default class WebpackDevConfigWeb extends WebpackBaseConfigWeb implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public devtool = '#source-map' as '#source-map';

  public plugins = this.plugins.concat(
    new MiniCssExtractPlugin({
      filename: `./[name]/bundle.css`,
      chunkFilename: `${Object.keys(this.entry)[0]}/[id].[chunkhash].css`,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}