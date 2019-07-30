import { Controller, Get } from 'routing-controllers';

@Controller('/test')
export default class IndexController {

  @Get('/testme')
  public mockApi() {
    return {
      code: '200',
      message: 'suceess',
      data: {
        mockData: 'biz mock data!'
      }
    };
  }
}