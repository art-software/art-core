import WebApiQnn from 'art-lib/src/core_all/services/WebApiQnn';

export default class MainPageService extends WebApiQnn {

  private getPageDto(result) {
    return result;
  }

  public getPage() {
    return this.requestGet('/testme', {}, {
      dto: this.getPageDto
    });
  }
}