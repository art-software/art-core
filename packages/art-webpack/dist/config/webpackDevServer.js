"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = __importDefault(require("./paths"));
const appConfig_1 = __importDefault(require("./appConfig"));
const ensureSlash_1 = __importDefault(require("art-dev-utils/lib/ensureSlash"));
const cors_1 = __importDefault(require("cors"));
const errorOverlayMiddleware_1 = __importDefault(require("art-dev-utils/lib/errorOverlayMiddleware"));
const webpackDevServeConfig = (proxy, allowedHost) => {
    const envName = process.env.NODE_ENV || 'development';
    const host = ensureSlash_1.default(appConfig_1.default.get(`devHost:${envName}`), false) || '0.0.0.0';
    const port = appConfig_1.default.get(`devPort:${envName}`);
    const publicPath = `${host}:${port}/public/`;
    return {
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        // Enable gzip compression of generated files.
        compress: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        // Tell the server where to serve content from. This is only necessary if you want to serve static files. 
        contentBase: paths_1.default.appPublic,
        // Tell the server to watch the files served by the devServer.contentBase option. File changes will trigger a full page reload.
        watchContentBase: true,
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the Webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
        hot: true,
        // It is important to tell WebpackDevServer to use the same "root" path
        // as we specified in the config. In development, we always serve from /.
        publicPath,
        // WebpackDevServer is noisy by default so we emit custom message instead
        // by listening to the compiler events with `compiler.plugin` calls above.
        quiet: true,
        // avoids CPU overload on some systems.
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 2000
        },
        host,
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            disableDotRule: true
        },
        public: allowedHost,
        proxy,
        before: (app) => {
            app.use(cors_1.default());
            app.use(errorOverlayMiddleware_1.default());
        }
    };
};
exports.default = webpackDevServeConfig;
