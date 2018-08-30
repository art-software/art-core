import WebApiQnn from 'art-lib/src/core_all/services/WebApiQnn';

export class MainPageService extends WebApiQnn {

  private getPageDto(result) {
    return result;
  }

  public getPage() {
    this.requestGet('/rest/url', {}, {
      dto: this.getPageDto
    });
  }
}