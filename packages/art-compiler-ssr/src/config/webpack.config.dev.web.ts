import webpack from 'webpack';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';
import { configBaseRules } from './configRules';
import { configPluginsWeb } from './configPluginsWeb';

export default class WebpackDevConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public resolve = {
    modules: ['node_modules', '.'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html']
  };

  public module = {
    rules: configBaseRules()
  };

  public devtool = '#source-map' as '#source-map';

  public plugins = configPluginsWeb.concat(
    // new MiniCssExtractPlugin({
    //   filename: `./[name]/bundle.css`
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );

  public optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: false as any
      }
    }
  };
}