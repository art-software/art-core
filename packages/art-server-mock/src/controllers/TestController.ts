import { JsonController, Get } from 'routing-controllers';

@JsonController('/mockApi')
export class TestController {

  @Get('/testme')
  public post() {
    return {
      code: '0000',
      message: 'success',
      data: {
        name: 'it is your name',
        age: 23
      }
    };
  }
}