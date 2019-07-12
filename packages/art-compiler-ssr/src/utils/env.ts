import appConfig from '../config/appConfig';

export const isProd = (): boolean => {
  return appConfig.get('NODE_ENV') === 'production';
};