import { JsonController, Post } from 'routing-controllers';

@JsonController()
export default class MainPageController {

  @Post('/test')
  public mockApi() {
    return {
      code: '0000',
      message: 'suceess',
      data: {
        success: 'biz mock data'
      }
    };
  }
}