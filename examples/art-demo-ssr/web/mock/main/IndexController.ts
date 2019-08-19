import { Controller, Get } from 'routing-controllers';

@Controller('/main')
export default class IndexController {

  @Get('/testme')
  public mockApi() {
    return {
      code: '200',
      message: 'suceess',
      data: {
        title: 'Title from Mock Server'
      }
    };
  }
}