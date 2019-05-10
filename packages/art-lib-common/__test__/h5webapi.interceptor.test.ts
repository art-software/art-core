import WebApiH5 from 'art-lib-common/src/core-h5/WebApiH5';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const domains = {
  local: 'http://localhost'
};

abstract class InterceptorWebApi extends WebApiH5 {
  constructor() {
    super(domains);
  }

  protected preRequest(requestConfig: AxiosRequestConfig) {
    requestConfig.headers = {
      'x-token': 'default-token'
    };
    return new Promise((resolve) => {
      resolve(requestConfig);
    });
  }

  protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
    const { method } = requestConfig;
    if (method === 'post') {
      requestConfig.data = {
        id: 'testid'
      };
    }
    return requestConfig;
  }

  protected responseInterceptor(response: AxiosResponse): any {
    const { data } = response;
    data.message = 'success';
    return response;
  }

  protected afterRequestResolve(res: AxiosResponse) {
    return new Promise((resolve) => {
      const { data, config, headers } = res;
      return resolve({ data, config, headers });
    });
  }

}

class InterceptorService extends InterceptorWebApi {

  public postData(name: string) {
    return this.requestPost('testme/post/json', {
      data: {
        name
      }
    });
  }
}

describe('Extended WebApiH5 instance service hooks and interceptors', () => {
  const testUrl = 'http://localhost?env=local&port=9999';
  // @ts-ignore
  jsdom.reconfigure({
    url: testUrl
  });

  test('test preRequet hook', () => {

    const interceptorService = new InterceptorService();
    const expectReqHeaders = {
      'x-token': 'default-token'
    };

    expect.assertions(1);

    return expect (
      interceptorService.postData('John').then((result) => {
        const { config } = result;
        return config.headers;
      })
    ).resolves.toMatchObject(expectReqHeaders);
  });

  test('test requestInterceptor hook', () => {

    const interceptorService = new InterceptorService();
    const expectReqDataContaining = 'testid';

    expect.assertions(1);

    return expect (
      interceptorService.postData('John').then((result) => {
        const { config } = result;
        return config.data;
      })
    ).resolves.toEqual(expect.stringContaining(expectReqDataContaining));
  });

  test('test responseInterceptor hook', () => {

    const interceptorService = new InterceptorService();
    const expectResData = {
      message: 'success'
    };

    expect.assertions(1);

    return expect (
      interceptorService.postData('John').then((result) => {
        const { data } = result;
        return data;
      })
    ).resolves.toMatchObject(expectResData);
  });

});