import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import merge from 'art-lib-utils/dist/utils/merge';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { HttpMethods } from 'art-lib-common/src/enums/HttpMethods';

export default abstract class WebApi {
  protected constructor() { }

  private basicRequestConfig: AxiosRequestConfig = {};

  public getBasicRequestConfig() {
    return this.basicRequestConfig;
  }

  public setBasicRequestConfig(basicRequestConfig: AxiosRequestConfig): AxiosRequestConfig {
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

  public getAxiosInstance(): AxiosInstance {
    return axios;
  }

  public requestGet(url: string, config: AxiosRequestConfig = {}) {
    config = merge(true, {}, config, { method: HttpMethods.get, url });
    return this.request(config);
  }

  public requestPost(url: string, config: AxiosRequestConfig = {}) {
    config = merge(true, {}, config, { method: HttpMethods.post, url });
    return this.request(config);
  }

  public requestPut(url: string, config: AxiosRequestConfig = {}) {
    config = merge(true, {}, config, { method: HttpMethods.put, url });
    return this.request(config);
  }

  public requestDelete(url: string, config: AxiosRequestConfig = {}) {
    config = merge(true, {}, config, { method: HttpMethods.delete, url });
    return this.request(config);
  }

  protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
    return requestConfig;
  }

  protected responseInterceptor(data: any): any {
    return data;
  }

  public request(requestConfig: AxiosRequestConfig): Promise<any> {
    const finalRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);

    const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
    this.assertion(finalRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);

    axios.interceptors.request.use(this.requestInterceptor);
    axios.interceptors.response.use(this.responseInterceptor);
    return this.preRequest(finalRequestConfig).then((config) => {
      return axios.request(config)
        .then((response) => {
          return this.afterRequestResolve(response);
        })
        .catch(this.errorHandler);
    }).catch(this.preRequestErrorHandler);
  }

  protected preRequest(requestConfig: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      resolve(requestConfig);
      reject(requestConfig);
    });
  }

  protected preRequestErrorHandler(requestConfig: AxiosRequestConfig) {
    return requestConfig;
  }

  protected afterRequestResolve(res: AxiosResponse) {
    return new Promise((resolve) => {
      return resolve(res);
    });
  }

  protected errorHandler(err: AxiosError): any {
    // Do something handling error
  }
}
