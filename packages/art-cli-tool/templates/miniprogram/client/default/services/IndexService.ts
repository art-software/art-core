import { WebApiCommon } from '../../common/services/WebApiCommon';
import { IIndexService, AjaxResult, IData } from './interfaces/IIndexService';

export default class IndexService extends WebApiCommon implements IIndexService {

  private getDataDto(result): AjaxResult<IData> {
    return result;
  }

  public getData(): Promise<AjaxResult<IData>> {
    return this.requestGet('/testme', {
      dto: this.getDataDto
    });
  }
}