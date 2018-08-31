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
const appConfig_1 = __importDefault(require("./appConfig"));
const path = __importStar(require("path"));
const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath');
const isProdEnv = process.env.NODE_ENV === 'production';
exports.configBaseRules = () => {
    const config = [];
    config.push(cssRule(isProdEnv));
    config.push(lessRule(isProdEnv));
    config.push(sassRule(isProdEnv));
    config.push(htmlRule);
    config.push(assetsRule);
    config.push(fontRule);
    config.push(jsRule);
    config.push(tsRule);
    return config;
};
const cssRule = (isProd) => {
    const config = [
        mini_css_extract_plugin_1.default.loader,
        { loader: 'css-loader', options: { minimize: isProd, sourceMap: !isProd } }
    ];
    if (!isProd) {
        config.unshift('css-hot-loader');
    }
    return {
        test: /\.css$/i,
        use: config
    };
};
const lessRule = (isProd) => {
    const config = [
        mini_css_extract_plugin_1.default.loader,
        { loader: 'css-loader', options: { sourceMap: !isProd } },
        { loader: 'venus-px2rem-loader', options: { remUnit: 100, remPrecision: 8 } },
        { loader: 'less-loader', options: { sourceMap: !isProd } }
    ];
    if (!isProd) {
        config.unshift('css-hot-loader');
    }
    return {
        test: /\.less$/i,
        use: config
    };
};
const sassRule = (isProd) => {
    const config = [
        mini_css_extract_plugin_1.default.loader,
        { loader: 'css-loader', options: { sourceMap: !isProd } },
        { loader: 'sass-loader', options: { sourceMap: !isProd } }
    ];
    if (!isProd) {
        config.unshift('css-hot-loader');
    }
    return {
        test: /\.scss$/i,
        use: config
    };
};
const htmlRule = {
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
const assetsRule = {
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
const fontRule = {
    test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
    use: [
        { loader: 'file-loader', options: { name: '[hash:8].[ext]' } }
    ]
};
const jsRule = {
    test: /\.(js|jsx)$/,
    use: [
        { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } }
    ]
};
const tsRule = {
    test: /\.(ts|tsx)$/,
    use: [
        { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] } },
        { loader: 'ts-loader', options: { transpileOnly: true, silent: true } }
    ]
};
