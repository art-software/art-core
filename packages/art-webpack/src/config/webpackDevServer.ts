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
    logLevel: 'error',
    // host: appConfig.get(`devHost:${envName}`),
    port: appConfig.get(`devPort:${envName}`)
  };
  return serve(argv, serveOptions).then(callback);
};

export default webpackServe;