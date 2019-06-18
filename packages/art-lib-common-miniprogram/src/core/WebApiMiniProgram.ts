import merge from 'art-lib-utils/dist/utils/merge';
import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import { HttpMethods } from '../enums/HttpMethods';

type PartialRequestOption = Partial<wx.RequestOption>;
interface BasicRequestOption extends PartialRequestOption {
  dto?: (result: any) => any;
  query?: { [key: string]: string };
}

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
    return this.request(newConfig);
  }

  public requestPost(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.POST });
    return this.request(newConfig);
  }

  public requestPut(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.PUT });
    return this.request(newConfig);
  }

  public requestDelete(url: string, config: BasicRequestOption) {
    const newConfig = merge(true, {}, config, { url, method: HttpMethods.DELETE });
    return this.request(newConfig);
  }

  public request(requestConfig: BasicRequestOption) {
    const mergedRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);

    const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
    this.assertion(mergedRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);

    return this.preRequest(mergedRequestConfig)
      .then((config) => {
        const { dto } = config;
        return this.requestPromise(config)
          .then((res) => {
            return this.afterRequestResolve(res).then(dto);
          })
          .catch(this.requestErrorHandler);
      })
      .catch(this.preRequestErrorHandler);
  }

  protected requestPromise(requestConfig: BasicRequestOption): Promise<any> {
    return new Promise((resolve, reject) => {
      requestConfig = merge(true, {}, {
        success: (res: wx.RequestSuccessCallbackResult) => {
          resolve(res);
        },
        fail: (res: wx.GeneralCallbackResult) => {
          reject(res);
        }
      }, requestConfig);

      delete requestConfig.dto;
      delete requestConfig.query;

      wx.request(requestConfig as wx.RequestOption);
    });
  }

  protected preRequest(requestConfig: BasicRequestOption): Promise<BasicRequestOption> {
    return new Promise((resolve) => {
      resolve(requestConfig);
    });
  }

  protected preRequestErrorHandler(err: any) {
    return err;
  }

  protected afterRequestResolve(res: wx.RequestSuccessCallbackResult): Promise<wx.RequestSuccessCallbackResult> {
    return new Promise((resolve) => {
      return resolve(res);
    });
  }

  protected requestErrorHandler(err: any) {
    return err;
  }
}