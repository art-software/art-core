import { Controller, Get } from 'routing-controllers';

@Controller('')
export default class IndexController {

  @Get('/testme')
  public mockApi() {
    return {
      code: '200',
      message: 'success',
      data: {
        mockData: 'biz mock data!'
      }
    };
  }
}