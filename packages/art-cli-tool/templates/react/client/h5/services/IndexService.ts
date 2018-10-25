import WebApiQnn from 'art-lib-react/src/core_all/services/WebApiQnn';

export default class IndexService extends WebApiQnn {

  private getDataDto(result) {
    return result;
  }

  public getData() {
    return this.requestGet('/testme', {
      dto: this.getDataDto
    });
  }
}