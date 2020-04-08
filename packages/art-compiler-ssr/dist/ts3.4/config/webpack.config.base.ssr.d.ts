/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack';
export declare class WebpackBaseConfigSSR implements Configuration {
    constructor(entry: any, output: any);
    entry: any;
    target: "node";
    stats: "errors-only";
    resolve: {
        modules: string[];
        extensions: string[];
    };
    module: {
        rules: import("webpack").RuleSetRule[];
    };
    output: any;
    mode: "development" | "production";
    plugins: any[];
}
//# sourceMappingURL=webpack.config.base.ssr.d.ts.map
