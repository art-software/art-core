import WebApi from 'art-lib-common/src/core/WebApi';
import { getQueryString } from 'art-lib-utils/dist/utils/url';
import { EnvNames } from '../enums/EnvNames';
import { AxiosRequestConfig } from 'axios';

export default abstract class WebApiH5 extends WebApi {
  constructor(basicRequestConfig: AxiosRequestConfig, domainConfig: object) {
    super(basicRequestConfig);
    this.domainConfig = domainConfig;
  }

  private domainConfig: object;

  private getEnvName(): string {
    return getQueryString('env') || EnvNames.prod;
  }

  private getPort(): string {
    return getQueryString('port') || '';
  }

  protected getDomain() {
    const envName = this.getEnvName();
    const port = this.getPort();
    let domain = this.domainConfig[envName] || '';
    if (port && envName !== EnvNames.local) {
      domain = `${domain}:${port}`;
    }
    return domain || '';
  }

  protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
    requestConfig.baseURL = this.getDomain();
    return requestConfig;
  }
}