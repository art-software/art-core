import { miniprogramWebpackEntry } from './miniprogramWebpackEntry';
import { isProd } from '../utils/env';
import paths from './paths';
import appConfig from './appConfig';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';

interface OutputProps {
  filename: string;
  // chunkFilename: string;
  path: string;
  publicPath: string;
}

const envName = appConfig.get('NODE_ENV') || 'development';
const isProdEnv = isProd();

export const webpackEntries = (): object => {
  return miniprogramWebpackEntry().entry;
};

export const webpackOutput = (): OutputProps => {
  const host =  ensureSlash(appConfig.get(`devHost:${envName}`), false);
  const port = appConfig.get(`devPort:${envName}`);
  const output = appConfig.get(`art:webpack:output`) || {};
  const publicPath = isProdEnv ? output[`${appConfig.get('BUILD_ENV')}PublicPath`] : `${host}:${port}/public/`;

  return {
    filename: `[name]`,
    path: isProdEnv ? paths.appPublic : paths.appDebug,
    publicPath
  };
};