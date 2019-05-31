import { IHomeService, AjaxResult, IDemoGet } from './interfaces/IHomeService';
import { WebApiDemo } from '../../common/services/WebApiCommon';

export class HomeService extends WebApiDemo implements IHomeService {

  private defaultDto (result) {
    return result;
  }

  public demoGet(): Promise<AjaxResult<IDemoGet>> {
    return this.requestGet('/demo/get', {
      dto: this.defaultDto
    });
  }

}