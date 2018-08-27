import { JsonController, Get } from 'routing-controllers';

@JsonController('/')
export class TestController {

  @Get()
  public getSomething() {
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