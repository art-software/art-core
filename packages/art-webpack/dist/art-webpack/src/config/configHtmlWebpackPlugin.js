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
const configWebpackModules_1 = require("./configWebpackModules");
const appConfig_1 = __importDefault(require("./appConfig"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const qs_1 = __importDefault(require("qs"));
const foreach_1 = __importDefault(require("lodash/foreach"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const HtmlWebpackCDNPlugin_1 = __importDefault(require("../plugins/HtmlWebpackCDNPlugin"));
const envName = process.env.NODE_ENV || 'development';
const isProd = envName === 'production';
const configHtmlWebpackPlugin = (entries) => {
    const plugins = [];
    const newEntries = entries || configWebpackModules_1.webpackEntries(false);
    const projectVirtualPath = appConfig_1.default.get('art:projectVirtualPath') || '';
    const assetsProdPublicPath = appConfig_1.default.get('art:webpack:output:publicPath') || '';
    const defaultTempleate = path.join(__dirname, '../plugins/index.template.ejs');
    foreach_1.default(newEntries, (value, key) => {
        const fragment = key.split('?');
        const entryKey = fragment[0];
        const queryKey = fragment[1];
        const queryObj = qs_1.default.parse(queryKey);
        const myTemplate = path.join(process.cwd(), 'client', entryKey.replace(projectVirtualPath, ''), 'index.template.ejs');
        const htmlWebpackPluginOptions = {
            chunks: [entryKey],
            minify: {
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true
            },
            template: fs.existsSync(myTemplate) ? myTemplate : defaultTempleate,
            title: queryObj.title || '',
            cdnPath: (queryObj.cdn === '0' || queryObj.cdn === 'false' || !isProd) ? '' : assetsProdPublicPath,
            filename: `${entryKey}/${queryObj.template || 'index.html'}`
        };
        plugins.push(new html_webpack_plugin_1.default(htmlWebpackPluginOptions));
    });
    plugins.push(new HtmlWebpackCDNPlugin_1.default());
    return plugins;
};
exports.default = configHtmlWebpackPlugin;
