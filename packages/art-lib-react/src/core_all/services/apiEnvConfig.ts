import EnvBase from '../../utils/env-base';
import { getQueryString } from '../../utils/url';
import serviceApi from './_servicesApi';

export class ApiEnvConfig extends EnvBase {
  public getEnvName(): string {
    return getQueryString('env') || 'prod';
  }

  public getPort(): string {
    return getQueryString('port') || '';
  }

  public serviceApi = {
    qnnWeb: serviceApi.qnnWeb
  };
}