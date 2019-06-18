import WebApiH5 from 'art-lib-common/src/core-h5/WebApiH5';
import { AxiosError } from 'axios';

const domains = {
  local: 'http://localhost'
};

abstract class ErrorHandlerWebApi extends WebApiH5 {
  constructor() {
    super(domains);
  }

  protected requestErrorHandler(err: AxiosError): any {
    return new Promise((resolve, reject) => {
      reject('server error!!');
    });
  }
}

class ErrorHandlerService extends ErrorHandlerWebApi {
  public getData() {
    return this.requestGet('testme/get/error');
  }
}

describe('Extended WebApiH5 instance service error handler', () => {

  const testUrl = 'http://localhost?env=local&port=9999';
  // @ts-ignore
  jsdom.reconfigure({
    url: testUrl
  });

  test('500 server error handler', () => {

    const errorHandlerService = new ErrorHandlerService();

    expect.assertions(1);

    return expect(
      errorHandlerService.getData()
        .catch((err) => {
          console.log('err: ', err);
          return err;
        })
    ).resolves.toBe('server error!!');
  });

});