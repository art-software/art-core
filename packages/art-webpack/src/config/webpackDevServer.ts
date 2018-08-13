import { WebpackDevConfig } from './webpack.config.dev';
import paths from './paths';
import appConfig from './appConfig';

const serveOptions = {
  compiler: new WebpackDevConfig('client'),
  content: paths.appPublic,
  host: appConfig.get(`devHost:${process.env.NODE_ENV || 'development' }`),
  hotClient: true,
  port: appConfig.get(`devPort:${process.env.NODE_ENV || 'development' }`)
};