import { WebApiMiniProgram } from './WebApiMiniProgram';
import { getQueryString } from 'art-lib-utils-wx/dist/utils/urlWxMiniprogram';
import { EnvNames } from '../enums/EnvNames';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';

export abstract class WebApiMiniProgramCommon extends WebApiMiniProgram {
  constructor(domainConfig: object) {
    super();
    this.domainConfig = domainConfig;
  }

  private domainConfig: object;

  protected getEnvName(): string {
    return getQueryString('env') || EnvNames.prod;
  }

  protected getPort(): string {
    return getQueryString('port') || '';
  }

  protected getDomain() {
    const envName = this.getEnvName();
    const port = this.getPort();
    let domain = this.domainConfig[envName] || '';
    if (port) {
      domain = `${domain}:${port}`;
    }
    return domain || '';
  }

  protected preRequest(requestConfig: wx.RequestOption): Promise<wx.RequestOption> {
    return new Promise((resolve) => {
      const urlPath = ensureSlash(requestConfig.url, false);
      let domain = ensureSlash(this.getDomain(), false);
      if (this.getEnvName() === EnvNames.local) {
        domain = domain + '/mock_api';
      }

      requestConfig.url = domain + urlPath;
      resolve(requestConfig);
    });
  }
}