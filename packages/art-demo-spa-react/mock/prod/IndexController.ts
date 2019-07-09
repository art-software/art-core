import { Controller, Get } from 'routing-controllers';

@Controller('/prod')
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