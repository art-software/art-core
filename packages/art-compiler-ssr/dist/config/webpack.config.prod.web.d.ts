/// <reference types="webpack-dev-server" />
import { WebpackBaseConfigWeb } from './webpack.config.base.web';
import { Configuration } from 'webpack';
export default class WebpackProdConfigWeb extends WebpackBaseConfigWeb implements Configuration {
    constructor(entry: any, output: any);
    plugins: any;
}
//# sourceMappingURL=webpack.config.prod.web.d.ts.map