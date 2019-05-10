import WebApiH5 from 'art-lib-common/src/core-h5/WebApiH5';

const domains = {
  local: 'http://localhost'
};

abstract class CommonWebApi extends WebApiH5 {
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
}

class IndexService extends CommonWebApi {

  public getData() {
    return this.requestGet('/testme/get');
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