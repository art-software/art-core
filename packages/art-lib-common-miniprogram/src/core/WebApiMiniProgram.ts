import merge from 'art-lib-utils/dist/utils/merge';
import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import { HttpMethods } from '../enums/HttpMethods';

type BasicRequestOption = Partial<wx.RequestOption>;

export abstract class WebApiMiniProgram {

  private basicRequestConfig: BasicRequestOption = {};

  public getBasicRequestConfig() {
    return this.basicRequestConfig;
  }

  public setBasicRequestConfig(basicRequestConfig: BasicRequestOption): BasicRequestOption {
    this.basicRequestConfig = merge(true, {}, this.basicRequestConfig, basicRequestConfig);
    return this.basicRequestConfig;
  }

  private assertion(target: any, message: string, checker: (v: any) => {}) {
    let checkValue = target;
    if (isFunction(checker)) {
      checkValue = checker(target);
    }
    if (checkValue === false) {
      throw new Error(message);
    }
  }

  public requestGet(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.GET });
    this.request(newConfig);
  }

  public requestPost(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.POST });
    this.request(newConfig);
  }

  public requestPut(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.PUT });
    this.request(newConfig);
  }

  public requestDelete(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.DELETE });
    this.request(newConfig);
  }

  public request(requestConfig: wx.RequestOption) {
    const mergedRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);

    const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
    this.assertion(mergedRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);

    return this.preRequest(mergedRequestConfig)
      .then((config) => {
        return this.requestPromise(config)
          .then((res) => {
            return this.afterRequestResolve(res);
          })
          .catch(this.requestErrorHandler);
      })
      .catch(this.preRequestErrorHandler);
  }

  protected requestPromise(requestConfig: wx.RequestOption): Promise<any> {
    return new Promise((resolve, reject) => {
      requestConfig = merge(true, {}, {
        success: (res: wx.RequestSuccessCallbackResult) => {
          resolve(res);
        },
        fail: (res: wx.GeneralCallbackResult) => {
          reject(res);
        }
      }, requestConfig);
      wx.request(requestConfig);
    });
  }

  protected preRequest(requestConfig: wx.RequestOption): Promise<wx.RequestOption> {
    return new Promise((resolve) => {
      resolve(requestConfig);
    });
  }

  protected preRequestErrorHandler(err: any) {
    return err;
  }

  protected afterRequestResolve(res: any) {
    return res;
  }

  protected requestErrorHandler(err: any) {
    return err;
  }
}