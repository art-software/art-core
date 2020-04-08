/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack';
export declare class WebpackBaseConfigWeb implements Configuration {
    constructor(entry: any, output: any);
    entry: any;
    stats: "errors-only";
    output: any;
    resolve: {
        modules: string[];
        extensions: string[];
    };
    module: {
        rules: import("webpack").RuleSetRule[];
    };
    plugins: any[];
    mode: "development" | "production";
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: any;
            };
        };
    };
}
//# sourceMappingURL=webpack.config.base.web.d.ts.map
