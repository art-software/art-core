import { isFunction, isObject, isString } from 'art-lib-utils/dist/utils/lang';
import merge from 'art-lib-utils/dist/utils/merge';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise, AxiosError } from 'axios';
import { HttpMethods } from 'art-lib-common/src/enums/HttpMethods';

export default abstract class WebApi {
  protected constructor(basicRequestConfig: AxiosRequestConfig = {}) {
    this.basicRequestConfig = basicRequestConfig;
  }

  private basicRequestConfig: AxiosRequestConfig;

  private assertion(target: any, message: string, checker: (v: any) => {}) {
    let checkValue = target;
    if (isFunction(checker)) {
      checkValue = checker(target);
    }
    if (checkValue === false) {
      throw new Error(message);
    }
  }

  public getInstance(): AxiosInstance {
    return axios;
  }

  public requestGet(url: string, config: AxiosRequestConfig = {}) {
    config = merge(true, {}, config, { method: HttpMethods.post, url });
    return this.request(config);
  }

  public requestPost(url: string, config: AxiosRequestConfig = {}) {
    config = merge(true, {}, config, { method: HttpMethods.get, url });
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

  public request<T>(requestConfig: AxiosRequestConfig): AxiosPromise<T> {
    const finalRequestConfig = merge(true, {}, this.basicRequestConfig, requestConfig);

    const urlCheck = (checkData) => isObject(checkData) && isString(checkData.url);
    this.assertion(finalRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);

    axios.interceptors.request.use(this.requestInterceptor);
    axios.interceptors.response.use(this.responseInterceptor);
    return axios.request(finalRequestConfig)
      .then((response) => {
        return response;
      })
      .catch(this.errorHandler);
  }

  protected errorHandler(err: AxiosError): any {
    // Do something handling error
  }
}