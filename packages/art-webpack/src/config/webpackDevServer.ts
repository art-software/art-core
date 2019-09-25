import paths from './paths';
import appConfig from './appConfig';
import WebpackDevServer from 'webpack-dev-server';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import cors from 'cors';
import errorOverlayMiddleware from 'art-dev-utils/lib/errorOverlayMiddleware';

const webpackDevServeConfig = (proxy, allowedHost): WebpackDevServer.Configuration => {
  const envName = process.env.NODE_ENV || 'development';
  const host = ensureSlash(appConfig.get(`devHost:${envName}`), false) || '0.0.0.0';
  const port = appConfig.get(`devPort:${envName}`);
  const publicPath = `${host}:${port}/public/`;

  return {
    disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // Tell the server where to serve content from. This is only necessary if you want to serve static files. 
    contentBase: paths.appPublic,
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
      app.use(cors());
      app.use(errorOverlayMiddleware());
    }
  };
};

export default webpackDevServeConfig;