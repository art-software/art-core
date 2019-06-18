import { WebApiMiniProgramCommon } from 'art-lib-common-miniprogram/src/core/WebApiMiniProgramCommon';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import { Storage } from '../enums/Storage';
import { EnvNames } from 'art-lib-common-miniprogram/src/enums/EnvNames';

const domains = {
  local: 'http://localhost',
  prod: 'http://example.com'
};

export abstract class WebApiDemo extends WebApiMiniProgramCommon {

  constructor() {
    super(domains);
    this.setBasicRequestConfig(this.requestConfig);
  }

  private requestConfig = {};

  protected preRequest(requestConfig: wx.RequestOption): Promise<wx.RequestOption> {
    const xjwt = wx.getStorageSync(Storage.xjwt);
    if (xjwt) {
      requestConfig.header = {
        'x-jwt': xjwt
      };
    }
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

  protected afterRequestResolve(res: wx.RequestSuccessCallbackResult): Promise<any> {
    return new Promise((resolve) => {
      resolve(res.data);
    });
  }
}