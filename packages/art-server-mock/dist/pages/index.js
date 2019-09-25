"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const routing_controllers_1 = require("routing-controllers");
const sort_json_1 = __importDefault(require("sort-json"));
const path = __importStar(require("path"));
const qs = __importStar(require("qs"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
// TODO optimize it later
const appConfig = require('../config/config');
const lodash_1 = require("lodash");
const url_join_1 = __importDefault(require("url-join"));
const chalk_1 = __importDefault(require("chalk"));
const fs = __importStar(require("fs"));
const glob_1 = __importDefault(require("glob"));
// import { webpackEntries } from '../../../art-webpack/dist/config/configWebpackModules.js';
// TODO optimize it later
// const webpackEntries = require(`../../../${ isSSRProject ? 'art-compiler-ssr' : 'art-webpack'}/dist/config/configWebpackModules.js`).webpackEntries;
const virtualProjectName = appConfig.get('art:projectVirtualPath');
// const entries = webpackEntries(true);
const publicPath = path.join(process.cwd(), './public');
class IndexPage {
    constructor() {
        this.builtModuleMatched = (pathFragment) => {
            const allConfigEntries = appConfig.get('art:webpack:entry') || {};
            const found = this.calcuMatchedModuleInfo(pathFragment, allConfigEntries);
            if (found) {
                console.log(chalk_1.default.yellow.bold('Using') + ` built module ${chalk_1.default.cyan(found.entryKey)}`);
                if (fs.existsSync(path.join(publicPath, found.entryKey, 'index.html'))) {
                    return found;
                }
            }
            return null;
        };
    }
    indexPage(req, res, artModules) {
        if (!req.originalUrl || req.originalUrl.includes('/mock_api')) {
            return;
        }
        const baseUrl = (req.baseUrl || '/').replace(req.moduleBase, '') || '/';
        const matchedModuleInfo = this.calcuMatchedModuleInfo(baseUrl, artModules);
        if (baseUrl === '/') {
            return this.renderAvailableModulesView(req, res, artModules);
        }
        const appEnv = appConfig.get('NODE_ENV') || 'development';
        const isProd = appEnv === 'production';
        if (isProd || !matchedModuleInfo) {
            // calculate the public/{module}/ if matched.
            const matchedBuiltModuleInfo = this.builtModuleMatched(baseUrl);
            if (!matchedBuiltModuleInfo) {
                return this.renderAvailableModulesView(req, res, artModules);
            }
            const { projectName, moduleName } = matchedBuiltModuleInfo;
            const moduleDir = path.join(publicPath, virtualProjectName, projectName, moduleName, '**/*.{js,css}');
            return glob_1.default(moduleDir, {}, (err, files) => {
                const bundleCss = files.filter((file) => path.extname(file) === '.css')[0];
                const bundleJs = files.filter((file) => path.extname(file) === '.js')[0];
                this.renderIndexView(req, res, matchedBuiltModuleInfo, {
                    ART_CDN_ROOT: res.app.locals.ART_SERVER_HOST_ROOT,
                    bundleJs: path.basename(bundleJs),
                    bundleCss: path.basename(bundleCss)
                });
            });
        }
        // return real module pageview.
        return this.renderIndexView(req, res, matchedModuleInfo);
    }
    calcuMatchedModuleInfo(pathFragment, queryEntries) {
        const targetModuleName = path.basename(pathFragment);
        let found = {};
        queryEntries.forEach((entry) => {
            const entryKey = entry.split('?')[0];
            const queryKey = entry.split('?')[1];
            if (entryKey.endsWith(pathFragment.substring(1))) {
                found = {
                    entryKey,
                    query: qs.parse(queryKey),
                    projectName: ensureSlash_1.default(entryKey.replace(new RegExp(`^${virtualProjectName}`), '')
                        .replace(new RegExp(`${targetModuleName}$`), ''), false),
                    moduleName: targetModuleName
                };
                return;
            }
        });
        return found;
    }
    normalizeEntries(entry) {
        return sort_json_1.default(entry);
    }
    renderAvailableModulesView(req, res, artModules) {
        const newEntries = lodash_1.reduce(this.normalizeEntries(artModules), (result, value, key) => {
            result.push({
                key: value.split('?')[0],
                value
            });
            return result;
        }, []);
        return res.render('normal/availableModules', {
            layout: 'guide',
            entries: newEntries,
            helpers: {
                getModuleLink: (host, key) => {
                    return url_join_1.default(host, path.join(req.moduleBase, key.replace(new RegExp(`^${virtualProjectName}`), '')));
                }
            }
        });
    }
    renderIndexView(req, res, moduleInfo, viewData = {}) {
        const { projectName, moduleName, query } = moduleInfo;
        let layout = query.layout || 'artIndex.hbs';
        const appServer = path.join(__dirname, '../../');
        const layoutAbsPath = path.join(__dirname, '../../views/layouts', layout);
        if (!fs.existsSync(layoutAbsPath)) {
            console.log(chalk_1.default.red.bold(`Could not find customized layout ${path.relative(appServer, layoutAbsPath)}`));
            layout = 'artIndex.hbs';
        }
        return res.render('normal/index', lodash_1.merge({
            layout: layout.replace(/\.hbs$/, ''),
            virtualProjectName: `${virtualProjectName}`,
            projectName: `${projectName}`,
            moduleName: `${moduleName}`,
            bundleCss: 'bundle.css',
            bundleJs: 'bundle.js',
            // Override `foo` helper only for this rendering.
            helpers: {
                normalizePath: (...args) => {
                    const [host, ...restArgs] = args;
                    const result = path.join(...lodash_1.filter(restArgs, (fragment) => lodash_1.isString(fragment)));
                    return url_join_1.default(host, result.replace(/^\.+/, ''));
                }
            }
        }, viewData));
    }
}
__decorate([
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Object)
], IndexPage.prototype, "indexPage", null);
exports.default = IndexPage;
