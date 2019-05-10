import WebApiH5 from 'art-lib-common/src/core-h5/WebApiH5';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const domains = {
  local: 'http://localhost'
};

abstract class DataWebApi extends WebApiH5 {
  constructor() {
    super(domains);
    this.setBasicRequestConfig({
      headers: this.h5Config.headers
    });
  }

  private getToken() {
    return 'default-token';
  }

  private h5Config = {
    headers: {
      'X-Token': this.getToken()
    }
  };

  protected responseInterceptor(response: AxiosResponse): any {
    return response.data;
  }
}

interface AjaxResult<T> {
  code: number;
  message: string;
  data: T;
}

interface IIndexService {
  getData(): Promise<AjaxResult<IData>>;
}

interface IData {
  mockData: string;
}

class IndexDataService extends DataWebApi implements IIndexService {

  public getData(): Promise<AjaxResult<IData>> {
    return this.requestGet('/testme/get');
  }

  public postData(): Promise<AjaxResult<IData>> {
    return this.requestPost('/testme/post');
  }

  public putData(): Promise<AjaxResult<IData>> {
    return this.requestPut('/testme/put');
  }

  public deleteData(): Promise<AjaxResult<IData>> {
    return this.requestDelete('/testme/delete');
  }

}

describe('Extended WebApiH5 instance service CURD', () => {
  const testUrl = 'http://localhost?env=local&port=9999';
  // @ts-ignore
  jsdom.reconfigure({
    url: testUrl
  });

  test('Http get request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.getData().then((result) => {
        return result;
      })
    ).resolves.toBe('get method success');

  });

  test('Http post request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.postData().then((result) => {
        return result;
      })
    ).resolves.toBe('post method success');
  });

  test('Http put request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.putData().then((result) => {
        return result;
      })
    ).resolves.toBe('put method success');
  });

  test('Http delete request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.deleteData().then((result) => {
        return result;
      })
    ).resolves.toBe('delete method success');
  });

});