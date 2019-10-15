import { WebApiMiniProgramCommon } from 'art-lib-common-miniprogram/src/core/WebApiMiniProgramCommon';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import { EnvNames } from 'art-lib-common-miniprogram/src/enums/EnvNames';

const domains = {
  local: 'http://me.dev.com:8000',
  prod: 'http://me.dev.com:8000'
};

export abstract class WebApiCommon extends WebApiMiniProgramCommon {

  constructor() {
    super(domains);
    super.setBasicRequestConfig(this.requestConfig);
  }

  private requestConfig = {};

  protected preRequest(requestConfig: wx.RequestOption): Promise<wx.RequestOption> {
    return new Promise((resolve) => {
      const urlPath = ensureSlash(requestConfig.url, false);
      let domain = ensureSlash(super.getDomain(), false);
      if (super.getEnvName() === EnvNames.local) {
        domain = domain + '/mock_api';
      }

      requestConfig.url = domain + urlPath;
      resolve(requestConfig);
    });
  }

  protected afterRequestResolve(res: wx.RequestSuccessCallbackResult): Promise<any> {
    return new Promise((resolve) => {
      resolve(res.data);
    });
  }
}