import WebApi from 'art-lib-common/src/core/WebApi';
import { getQueryString } from 'art-lib-utils/dist/utils/url';
import { EnvNames } from '../enums/EnvNames';

export default abstract class WebApiH5 extends WebApi {
  constructor(domainConfig: object) {
    super();
    this.domainConfig = domainConfig;
    this.setBasicRequestConfig({
      baseURL: this.getDomain()
    });
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
}