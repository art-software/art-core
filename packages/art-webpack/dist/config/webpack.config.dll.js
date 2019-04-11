"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const path_1 = require("path");
const paths_1 = __importDefault(require("./paths"));
const path_2 = require("path");
const fs_1 = require("fs");
const optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
const uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
// const version = '20180901';
const version = '201903';
const defaultVendor = path_1.join(paths_1.default.appCwd, 'node_modules/art-lib-react/dist/vendors');
const vendorPath = fs_1.existsSync(defaultVendor) ? defaultVendor : path_1.join(__dirname, '../../../art-lib-react/dist/vendors');
const vendors = [
    'polyfills',
    'react',
    'react-dom',
    'react-router-dom',
    'classnames',
    'axios',
    'art-lib-react/src/components/scroll/lib/iscroll-probe'
];
class WebpackDLLConfig {
    constructor() {
        this.mode = 'production';
        this.entry = {
            shared: vendors
        };
        this.output = {
            path: vendorPath,
            filename: `art_framework.${version}.js`,
            library: `[name]_${version}`
        };
        this.resolve = {
            alias: {
                lib: 'art-lib-react',
                polyfills: path_2.resolve(__dirname, '../config/polyfills.js')
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        };
        this.module = {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } }
                    ]
                },
                {
                    test: /\.(ts|tsx)$/, use: [
                        { loader: 'babel-loader', options: { presets: ['@babel/preset-react', '@babel/preset-env'] } },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                silent: true,
                                configFile: path_1.join(__dirname, '../../tsconfig.dll.json'),
                                allowTsInNodeModules: true
                            }
                        }
                    ]
                }
            ]
        };
        this.plugins = [
            new optimize_css_assets_webpack_plugin_1.default(),
            new uglifyjs_webpack_plugin_1.default({
                cache: true,
                parallel: true,
                // set to true if you want JS source maps
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        warnings: true,
                        dead_code: true,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            new webpack_1.default.DllPlugin({
                path: path_1.join(vendorPath, 'manifest.json'),
                name: `[name]_${version}`,
                context: path_1.join(paths_1.default.appCwd)
            })
        ];
    }
}
exports.default = WebpackDLLConfig;
