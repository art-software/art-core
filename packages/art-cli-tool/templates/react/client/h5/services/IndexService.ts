import WebApiQnn from 'art-lib-common/dist/core_all/services/WebApiQnn';
import { IIndexService } from './interfaces/IIndexService';

export default class IndexService extends WebApiQnn implements IIndexService {

  private getDataDto(result) {
    return result;
  }

  public getData() {
    return this.requestGet('/testme', {
      dto: this.getDataDto
    });
  }
}