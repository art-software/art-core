import EnvBase from '../../utils/env-base';
import { getQueryString } from '../../utils/url';
import serviceApi from './_servicesApi';

export class ApiEnvConfig extends EnvBase {
  public getEnvName() {
    return getQueryString('env') || 'prod';
  }

  public serviceApi = {
    qnnWeb: serviceApi.qnnWeb
  };
}