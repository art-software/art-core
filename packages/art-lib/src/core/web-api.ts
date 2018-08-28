import { isPlainObject, isFunction } from '../utils/lang';
import merge from '../utils/merge';

const apiDefaultConfig = {

};

export default class WebApi {

  public constructor(baseData: object = {}, config: object = {}) {
    this.baseData = baseData;
    this.apiConfig = merge(true, {}, apiDefaultConfig, config);
  }

  public baseData: object;
  public apiConfig: object;

  public request(method: string, url: string | object, data = {}, config = {}) {
    const inputRawData = this.adjustParameter(url, data, config);

  }

  public adjustParameter(url: string | object, data = {}, config?: any) {
    if (isPlainObject(url)) {
      config = data;
      data = url;
      url = this.getDomainApi();
    }

    let dto = (result) => {
      return result;
    };

    if (isFunction(config)) {
      dto = config;
      config = {};
    } else if (isPlainObject(config)) {
      if (isFunction(config.dto)) {
        dto = config.dto;
        delete config.dto;
      }
    } else {
      config = {};
    }

    config = merge(true, {}, this.apiConfig, config);
    return { url, data, dto, config };
  }

  public getDomainApi(): string {
    throw new Error('please override `getDomainApi()` in your service');
  }

  public preRequest(inputData: any) {

  }
}