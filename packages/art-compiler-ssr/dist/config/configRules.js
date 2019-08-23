"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const path = __importStar(require("path"));
const env_1 = require("../utils/env");
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const appConfig_1 = __importDefault(require("./appConfig"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
const prod = env_1.isProd();
exports.configBaseRules = () => {
    let config = [];
    config = config.concat([
        exports.cssRule(prod),
        exports.lessRule(prod),
        exports.sassRule(prod),
        exports.htmlRule,
        exports.assetsRule,
        exports.fontRule,
        exports.jsRule,
        exports.tsRule
    ]);
    return config;
};
exports.cssRule = (isProdEnv, isSSR) => {
    const config = [
        { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
        { loader: 'postcss-loader', options: { config: { path: __dirname } } }
    ];
    if (!isProdEnv) {
        config.unshift('css-hot-loader');
    }
    if (!isSSR) {
        config.unshift(mini_css_extract_plugin_1.default.loader);
    }
    config.unshift('isomorphic-style-loader');
    return {
        test: /\.css$/i,
        use: config
    };
};
exports.lessRule = (isProdEnv, isSSR) => {
    const config = [
        { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
        { loader: 'postcss-loader', options: { config: { path: __dirname } } },
        { loader: 'venus-px2rem-loader', options: { remUnit: 100, remPrecision: 8 } },
        { loader: 'less-loader', options: { sourceMap: !isProdEnv } }
    ];
    if (!isProdEnv) {
        config.unshift('css-hot-loader');
    }
    if (!isSSR) {
        config.unshift(mini_css_extract_plugin_1.default.loader);
    }
    config.unshift('isomorphic-style-loader');
    return {
        test: /\.less$/i,
        use: config
    };
};
exports.sassRule = (isProdEnv, isSSR) => {
    const config = [
        { loader: 'css-loader', options: { sourceMap: !isProdEnv } },
        { loader: 'postcss-loader', options: { config: { path: __dirname } } },
        { loader: 'sass-loader', options: { sourceMap: !isProdEnv } }
    ];
    if (!isProdEnv) {
        config.unshift('css-hot-loader');
    }
    if (!isSSR) {
        config.unshift(mini_css_extract_plugin_1.default.loader);
    }
    config.unshift('isomorphic-style-loader');
    return {
        test: /\.scss$/i,
        use: config
    };
};
exports.htmlRule = {
    test: /\.html$/,
    use: [
        {
            loader: 'html-loader',
            options: {
                minimize: true,
                attrs: ['img:src', 'img:data-original', 'div:data-original']
            }
        }
    ]
};
exports.assetsRule = {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 5000,
                context: path.resolve(process.cwd(), './client'),
                name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`
            }
        }
    ]
};
exports.assetsRuleSSR = () => {
    const argv = process.argv;
    const envName = argv[argv.indexOf('--NODE_ENV') + 1];
    const port = argv[argv.indexOf('--DEV_PORT') + 1];
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false);
    const output = appConfig_1.default.get(`art:webpack:output`) || {};
    const buildEnv = appConfig_1.default.get('BUILD_ENV');
    const publicPath = env_1.isProd() ? output[`${buildEnv}PublicPath`] : `${host}:${port}/public/`;
    // const publicPath = `${host}:${port}/public/`;
    return {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    context: path.resolve(process.cwd(), './client'),
                    name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`,
                    publicPath,
                    emitFile: false
                }
            }
        ]
    };
};
exports.fontRule = {
    test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
    use: [
        {
            loader: 'file-loader', options: {
                // name: '[hash:8].[ext]'
                context: path.resolve(process.cwd(), './client'),
                name: `${projectVirtualPath}/[path][name]-[hash:8].[ext]`
            }
        }
    ]
};
exports.jsRule = {
    test: /\.(js|jsx)$/,
    use: [
        { loader: 'happypack/loader?id=jsx' }
    ],
    exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-utils-wx|art-lib-common)\/).*/
};
exports.tsRule = {
    test: /\.(ts|tsx)$/,
    use: [
        { loader: 'happypack/loader?id=jsx' },
        { loader: 'happypack/loader?id=ts' }
    ],
    exclude: /node_modules\/(?!(art-lib-react|art-lib-utils|art-lib-utils-wx|art-lib-common)\/).*/
};
exports.nullRule = {
    test: /\.(ttf|eot|woff|woff2)$/,
    use: 'null-loader'
};
