/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack';
export declare class WebpackBaseConfig implements Configuration {
    constructor(entry: any, output: any);
    entry: any;
    stats: "errors-only";
    output: any;
    mode: "development" | "production";
}
//# sourceMappingURL=webpack.config.base.d.ts.map