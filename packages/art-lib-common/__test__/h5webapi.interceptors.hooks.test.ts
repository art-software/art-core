import WebApiH5 from 'art-lib-common/src/core-h5/WebApiH5';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const domains = {
  local: 'http://localhost'
};

abstract class InterceptorHooksWebApi extends WebApiH5 {
  constructor() {
    super(domains);
  }

  protected requestInterceptor(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
    requestConfig.headers = {
      'x-token': 'default-token'
    };
    return requestConfig;
  }

  protected responseInterceptor(response: AxiosResponse): any {
    if (response.status === 200) {
      response.data.message = 'success';
    }
    return response;
  }
}

class InterceptorsHooksService extends InterceptorHooksWebApi {

  public postData() {
    return this.requestPost('testme/post/json', {
    });
  }

  private transformRequest(data: any, headers: any) {
    if (data.name && headers['x-token']) {
      data.isAuth = true;
    }
    return JSON.stringify(data);
  }

  public postDataWithRequestTransform(name: string) {
    return this.requestPost('testme/post/json', {
      transformRequest: this.transformRequest,
      data: {
        name
      }
    });
  }

  private transformResponse(data: any) {
    data = JSON.parse(data);
    const { firstName = '', lastName = '' } = data || {};
    data.name = `${firstName} ${lastName}`;
    return data;
  }

  public postDataWithResponseTransform() {
    return this.requestPost('testme/post/json', {
      transformResponse: this.transformResponse
    });
  }
}

describe('Extended WebApiH5 instance service hooks and interceptors', () => {
  const testUrl = 'http://localhost?env=local&port=9999';
  // @ts-ignore
  jsdom.reconfigure({
    url: testUrl
  });

  test('test requestInterceptor interceptor', () => {

    const interceptorsHooksService = new InterceptorsHooksService();
    const expectReqHeaders = {
      'x-token': 'default-token'
    };

    expect.assertions(1);

    return expect (
      interceptorsHooksService.postData().then((result) => {
        const { config } = result;
        return config.headers;
      })
    ).resolves.toMatchObject(expectReqHeaders);
  });

  test('test responseInterceptor interceptor', () => {

    const interceptorsHooksService = new InterceptorsHooksService();
    const expectResData = {
      message: 'success'
    };

    expect.assertions(1);

    return expect (
      interceptorsHooksService.postData().then((result) => {
        const { data } = result;
        return data;
      })
    ).resolves.toMatchObject(expectResData);
  });

  test('test transformRequest hook', () => {

    const interceptorsHooksService = new InterceptorsHooksService();

    expect.assertions(1);

    return expect (
      interceptorsHooksService.postDataWithRequestTransform('John').then((result) => {
        const { config } = result;
        const data = JSON.parse(config.data);
        return data.isAuth;
      })
    ).resolves.toBe(true);
  });

  test('test transformResponse hook', () => {

    const interceptorsHooksService = new InterceptorsHooksService();

    expect.assertions(1);

    return expect (
      interceptorsHooksService.postDataWithResponseTransform().then((result) => {
        const { data } = result;
        return data.name;
      })
    ).resolves.toBe('John Williams');
  });

});