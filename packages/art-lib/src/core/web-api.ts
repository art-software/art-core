import { isPlainObject, isFunction, isObject, isString } from '../utils/lang';
import merge from '../utils/merge';
import promisify from '../utils/promisify';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';
import { appendUrlParameter } from '../utils/url';

export type RequestFunc = (url: string, data: object, config: object) => Promise<any>;
export interface RequestMethods {
  GET: RequestFunc;
  POST: RequestFunc;
  PUT: RequestFunc;
  DELETE: RequestFunc;
}

interface RequestConfig {
  data?: object;
  dto?: (result: any) => any;
  query?: object;
}

const apiDefaultConfig = {
  // https://github.com/mzabriskie/axios
  // `headers` are custom headers to be sent
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
};

export default class WebApi {

  public constructor(baseData: object = {}, config: object = {}) {
    this.baseData = baseData;
    this.apiConfig = merge(true, {}, apiDefaultConfig, config);
  }

  public baseData: object;
  public apiConfig: any;
  public requestService: RequestMethods;

  /**
   * override it in inherited class
   * @param requestService 
   */
  public setRequestService(requestService: RequestMethods) {
    this.requestService = requestService;
  }

  public assertion(target: any, message: string, checker: (v: any) => {}) {
    let checkValue = target;
    if (isFunction(checker)) {
      checkValue = checker(target);
    }
    if (checkValue === false) {
      throw new Error(message);
    }
  }

  public requestPost(url: string, config: RequestConfig = {}) {
    return this.request('POST', url, config);
  }

  public requestGet(url: string, config: RequestConfig = {}) {
    return this.request('GET', url, config);
  }

  public request(method: string, url: string, config: RequestConfig = {}) {
    const inputRawData = this.adjustParameter(url, config);
    return this.preRequest(inputRawData).then((inputData: any) => {
      this.assertion(inputData, 'request() http `inputData.url` must be providered!', (checkData) => isObject(checkData) && isString(checkData.url));
      return this.requestService[method](inputData.url, inputData.data, inputData.config).then((result) => {
        return promisify(this.interceptorDto)({ requestData: inputData }, result)
          .then((newResult) => {
            // 业务代码中定义的dto
            return inputData.dto.call(this, newResult);
          });
      });
    }).catch(this.requestErrorHandler(inputRawData));
  }

  public getReqData(data?: any) {
  }

  public requestErrorHandler(inputData: any) {
    return (catchErr) => {
      return promisify(this.interceptorExceptionDto)({ requestData: inputData }, catchErr)
        .then((err) => { throw err; });
    };
  }

  // public monitorService() {

  // }

  public interceptorExceptionDto = ({ resolve, ...options }, err) => {
    // if (isObject(this.monitorService) && isFunction(this.monitorService.interceptorException)) {
    //   this.monitorService.interceptorException.call(this, options, err);
    // }
    resolve(err);
  }

  /**
   * api response拦截器，可以在子类中overwrite
   */
  public interceptorDto = ({ resolve, ...options }, result) => {
    // if (isObject(this.monitorService) && isFunction(this.monitorService.interceptorException)) {
    //   this.monitorService.interceptorException.call(this, options, err);
    // }
    resolve(result.data);
  }

  public adjustParameter(url: string = '', config: RequestConfig = {}) {

    let dto = (result) => {
      return result;
    };
    let data: object = {};

    if (isPlainObject(config.data)) {
      data = (config as RequestConfig).data || {};
      delete (config as RequestConfig).data;
    }
    if (isFunction(config.dto)) {
      dto = (config as RequestConfig).dto || dto;
      delete (config as RequestConfig).dto;
    }

    url = ensureSlash(this.getDomainApi(), false) + ensureSlash(url, false);
    if (isPlainObject(config.query)) {
      const query = config.query as object;
      for (const prop in query) {
        url = appendUrlParameter(prop, query[prop], url);
      }
    }

    config = merge(true, {}, this.apiConfig, config);
    return { url, data, dto, config };
  }

  public getDomainApi(): string {
    throw new Error('please override `getDomainApi()` in your service');
  }

  public preRequest(inputData: any): Promise<any> {
    return this.promiseResult(inputData);
  }

  public promiseResult(data): Promise<any> {
    return promisify(
      ({ resolve }) => resolve(data)
    )({}, []);
  }
}