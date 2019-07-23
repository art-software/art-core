import WebApi from '../core/WebApi';
import { AxiosRequestConfig } from 'axios';
import merge from 'art-lib-utils/dist/utils/merge';

export default abstract class WebApiServer extends WebApi {
  constructor(config: AxiosRequestConfig) {
    super();
    this.setBasicRequestConfig(
      merge(true, {}, config)
    );
  }
}