/// <reference types="webpack-dev-server" />
import { WebpackBaseConfigSSR } from './webpack.config.base.ssr';
import { Configuration } from 'webpack';
export default class WebpackProdConfigSSR extends WebpackBaseConfigSSR implements Configuration {
    constructor(entry: any, output: any);
    plugins: any;
}
//# sourceMappingURL=webpack.config.prod.ssr.d.ts.map
