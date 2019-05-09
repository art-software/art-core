import WebApiH5 from '../src/core-h5/WebApiH5';
import { AxiosResponse } from 'axios';

const qnnDomains = {
  local: 'http://localhost'
};

abstract class CommonWebApi extends WebApiH5 {
  constructor() {
    super(qnnDomains);
    this.setBasicRequestConfig({
      headers: this.qnnH5Config.headers
    });
  }

  private getToken() {
    return 'default-token';
  }

  private qnnH5Config = {
    headers: {
      'X-Token': this.getToken()
    }
  };
}

abstract class CommonDataWebApi extends WebApiH5 {
  constructor() {
    super(qnnDomains);
    this.setBasicRequestConfig({
      headers: this.qnnH5Config.headers
    });
  }

  private getToken() {
    return 'default-token';
  }

  private qnnH5Config = {
    headers: {
      'X-Token': this.getToken()
    }
  };

  protected afterRequestResolve(res: AxiosResponse) {
    return new Promise((resolve) => {
      return resolve(res.data);
    });
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

class IndexService extends CommonWebApi {

  public getData() {
    return this.requestGet('/testme/get');
  }
}

class IndexDataService extends CommonDataWebApi implements IIndexService {

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

describe('Extended WebApiH5 instance request configs', () => {
  const testUrl = 'http://localhost?env=local&port=9999';
  // @ts-ignore
  jsdom.reconfigure({
    url: testUrl
  });

  test('Config Headers', () => {
    const indexService = new IndexService();

    expect.assertions(1);

    return expect(
      indexService.getData().then((result) => {
        const { config } = result;
        const { headers } = config;
        const headerToken = headers['X-Token'];
        console.log(headerToken);
        return headerToken;
      })
    ).resolves.toBe('default-token');
  });
});

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
        console.log(result);
        return result;
      })
    ).resolves.toBe('get method success');

  });

  test('Http post request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.postData().then((result) => {
        console.log(result);
        return result;
      })
    ).resolves.toBe('post method success');
  });

  test('Http put request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.putData().then((result) => {
        console.log(result);
        return result;
      })
    ).resolves.toBe('put method success');
  });

  test('Http delete request', () => {
    const indexDataService = new IndexDataService();

    expect.assertions(1);

    return expect(
      indexDataService.deleteData().then((result) => {
        console.log(result);
        return result;
      })
    ).resolves.toBe('delete method success');
  });

});
