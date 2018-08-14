import paths from './paths';
import appConfig from './appConfig';
import Webpack, { Compiler } from 'webpack';
import serve from 'webpack-serve';

const envName = process.env.NODE_ENV || 'development';

const webpackServe = (compiler: Compiler, callback: (result) => any) => {
  const argv = {};
  const serveOptions = {
    compiler,
    content: paths.appPublic,
    // host: appConfig.get(`devHost:${ envName }`),
    host: 'http://127.0.0.1',
    hotClient: {
      // host: appConfig.get(`devHost:${ envName }`),
      host: 'http://127.0.0.1',
      // port: appConfig.get(`devPort:${ envName }`)
      port: 3000,
      autoConfigure: false
    },
    // port: appConfig.get(`devPort:${ envName }`),
    port: 3000,
    logLevel: 'warn'
  };
  return serve(argv, serveOptions).then(callback);
};

export default webpackServe;