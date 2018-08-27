import { JsonController, Get } from 'routing-controllers';

@JsonController()
export class TestController {

  @Get('/test')
  public post() {
    return {
      code: '0000',
      message: 'success',
      data: {}
    };
  }
}