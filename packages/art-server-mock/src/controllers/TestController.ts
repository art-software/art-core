import { Controller, Get } from 'routing-controllers';

@Controller()
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