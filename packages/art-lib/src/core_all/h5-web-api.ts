import WebApi from '../core/web-api';
import h5Request from './h5-request';
import merge from '../utils/merge';
import { ApiEnvConfig } from './services/apiEnvConfig';

export default class H5WebApi extends WebApi {

  constructor(baseData = {}, config = { serviceName: '' }) {
    super(baseData, config);

    this.setRequestService(h5Request());
  }

  public getDomainApi(): string {
    const { serviceName = '' } = this.apiConfig;
    const apiEnvConfig = new ApiEnvConfig();
    const customServiceConfig = this.getYourCustomServiceConfig();
    merge(true, apiEnvConfig.serviceApi, customServiceConfig);
    const envName = apiEnvConfig.getEnvName();
    let domainApi = apiEnvConfig.get(`serviceApi.${serviceName}.${envName}`);
    const port = apiEnvConfig.getPort();
    if (port && envName !== 'me') {
      domainApi = `${domainApi}:${port}`;
    }
    return domainApi || '';
  }

  /**
   * overwrite it when necessary
   */
  public getYourCustomServiceConfig() {
    return {};
  }
}