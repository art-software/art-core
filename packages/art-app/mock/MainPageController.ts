import { Controller, Get } from 'routing-controllers';

@Controller()
export default class MainPageController {

  @Get('/testme')
  public mockApi() {
    return {
      code: '0000',
      message: 'suceess',
      data: {
        success: 'biz mock data!'
      }
    };
  }
}