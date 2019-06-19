import WebApiCommon from '../common/services/WebApiCommon';
import { IIndexService } from './interfaces/IIndexService';

export default class IndexService extends WebApiCommon implements IIndexService {

  private getDataDto(result) {
    return result;
  }

  public getData() {
    return this.requestGet('/testme', {
      transformResponse: this.getDataDto
    });
  }
}