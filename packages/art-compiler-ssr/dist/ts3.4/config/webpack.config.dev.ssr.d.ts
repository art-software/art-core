/// <reference types="webpack-dev-server" />
import { WebpackBaseConfigSSR } from './webpack.config.base.ssr';
import { Configuration } from 'webpack';
export default class WebpackDevSSRConfig extends WebpackBaseConfigSSR implements Configuration {
    constructor(entry: any, output: any);
    devtool: "#source-map";
}
//# sourceMappingURL=webpack.config.dev.ssr.d.ts.map
