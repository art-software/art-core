/// <reference types="webpack-dev-server" />
import webpack, { Configuration } from 'webpack';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
export default class WebpackDLLConfig implements Configuration {
    mode: "production";
    entry: {
        shared: any;
    };
    output: {
        path: string;
        filename: string;
        library: string;
    };
    resolve: {
        alias: {
            lib: string;
            polyfills: string;
        };
        extensions: string[];
    };
    module: {
        rules: {
            test: RegExp;
            use: ({
                loader: string;
                options: {
                    presets: string[];
                    transpileOnly?: undefined;
                    silent?: undefined;
                    configFile?: undefined;
                    allowTsInNodeModules?: undefined;
                };
            } | {
                loader: string;
                options: {
                    transpileOnly: boolean;
                    silent: boolean;
                    configFile: string;
                    allowTsInNodeModules: boolean;
                    presets?: undefined;
                };
            })[];
        }[];
    };
    plugins: (webpack.DllPlugin | OptimizeCSSAssetsPlugin | UglifyJsPlugin)[];
}
//# sourceMappingURL=webpack.config.dll.d.ts.map
