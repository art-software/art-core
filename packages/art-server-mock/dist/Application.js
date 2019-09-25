"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = require("path");
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
const compression_1 = __importDefault(require("compression"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const handlebars_helpers_1 = __importDefault(require("handlebars-helpers"));
const choosePort_1 = __importDefault(require("art-dev-utils/lib/choosePort"));
const printInstructions_1 = __importDefault(require("art-dev-utils/lib/printInstructions"));
const prepareUrls_1 = __importDefault(require("art-dev-utils/lib/prepareUrls"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
// TODO optimize it later
const config = require('./config/config');
const openBrowser_1 = __importDefault(require("art-dev-utils/lib/openBrowser"));
const chalkColors_1 = require("art-dev-utils/lib/chalkColors");
const index_1 = __importDefault(require("./pages/index"));
const artConfigPath = path_1.join(process.cwd(), './package.json');
const artAppConfig = require(artConfigPath);
const envName = config.get('NODE_ENV') || 'development';
let artModules = JSON.parse(config.get('ART_MODULES')) || [];
if (typeof artModules === 'string') {
    artModules = JSON.parse(artModules);
}
class App {
    appTemplate(app) {
        const handlebars = express_handlebars_1.default.create({
            defaultLayout: 'main',
            extname: '.hbs',
            layoutsDir: path_1.join(__dirname, '../views/layouts'),
            partialsDir: path_1.join(__dirname, '../views/partials'),
            helpers: handlebars_helpers_1.default
        });
        app.engine('.hbs', handlebars.engine);
        app.set('view engine', '.hbs');
        app.set('views', path_1.join(__dirname, '../views'));
    }
    // UPDATE  GLOBAL veriables for handbars views
    appLocals(app, expressPort, webpackPort, urls) {
        let devHost = ensureSlash_1.default(config.get(`devHost:${envName}`), false);
        const devServerHost = ensureSlash_1.default(`${devHost}:${expressPort}`, false);
        devHost = devHost
            ? ensureSlash_1.default(`${devHost}:${webpackPort}`, false)
            : ensureSlash_1.default(urls.localUrlForBrowser.replace(expressPort, webpackPort), false);
        Object.assign(app.locals, {
            env: envName,
            ART_CDN_ROOT: devHost,
            ART_SERVER_HOST_ROOT: devServerHost,
            ART_SERVER_API_ROOT: devServerHost + '/mock_api'
        });
    }
    controllers() {
        const ctrls = [];
        const bizConrtollers = path_1.join(process.cwd(), './mock');
        if (fs.existsSync(bizConrtollers)) {
            ctrls.push(path_1.join(bizConrtollers, './dist/**/*'));
        }
        ctrls.push(path_1.join(__dirname, './controllers/*'));
        return ctrls;
    }
    appIndexPage(app) {
        const indexPage = new index_1.default();
        app.use('/', (req, res, next) => {
            req.moduleBase = '/';
            next();
        });
        app.use(/\/[^.]*$|^(?:https?:)?\/\/[^/]+$/, (req, res) => {
            indexPage.indexPage(req, res, artModules);
        });
    }
    createApp() {
        const app = express_1.default();
        const publicPath = path_1.join(process.cwd(), './public');
        app.use(serve_favicon_1.default(path_1.join(__dirname, '../favicon.ico')));
        app.use('/public', compression_1.default(), express_1.default.static(publicPath));
        const vendorPath = path_1.join(__dirname, '../../art-lib-react/dist/vendors/');
        app.use('/static', compression_1.default(), express_1.default.static(vendorPath));
        this.appTemplate(app);
        routing_controllers_1.useExpressServer(app, {
            routePrefix: '/mock_api',
            controllers: this.controllers()
        });
        this.appIndexPage(app);
        return app;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const host = config.get('HOST') || '0.0.0.0';
            const webpackPort = config.get('ART_WEBPACK_PORT') || 3000;
            const protocol = config.get('HTTPS') === 'true' ? 'https' : 'http';
            const appName = artAppConfig.name;
            const isProd = process.env.NODE_ENV === 'production';
            let expressPort = null;
            try {
                expressPort = yield choosePort_1.default(host, isProd ? webpackPort : parseInt(webpackPort, 10) + 1);
            }
            catch (err) {
                return console.log(err);
            }
            const app = this.createApp();
            if (expressPort === null) {
                return;
            }
            app.listen(expressPort, host, (err) => {
                if (err) {
                    return console.log(err);
                }
                const urls = prepareUrls_1.default(protocol, host, expressPort);
                const { hostname } = url.parse(config.get(`devHost:${envName}`));
                this.appLocals(app, expressPort, isProd ? expressPort : webpackPort, urls);
                printInstructions_1.default(appName, urls);
                if (config.get('ART_SUPERVISOR_STATUS') === 'false') {
                    if (!hostname) {
                        return console.log(chalkColors_1.warningText('no valid hostname'));
                    }
                    openBrowser_1.default(urls.localUrlForBrowser.replace('localhost', hostname));
                }
            });
        });
    }
}
exports.default = App;
