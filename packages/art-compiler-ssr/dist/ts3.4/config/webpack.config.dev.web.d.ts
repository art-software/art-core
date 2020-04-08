/// <reference types="webpack-dev-server" />
import { WebpackBaseConfigWeb } from './webpack.config.base.web';
import { Configuration } from 'webpack';
export default class WebpackDevConfigWeb extends WebpackBaseConfigWeb implements Configuration {
    constructor(entry: any, output: any);
    devtool: "#source-map";
    plugins: any;
}
//# sourceMappingURL=webpack.config.dev.web.d.ts.map
