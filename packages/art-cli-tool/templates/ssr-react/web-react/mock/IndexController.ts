import { Controller, Get } from 'routing-controllers';

@Controller('/mock_request')
export default class IndexController {

  @Get('/testme')
  public mockApi() {
    return {
      code: '200',
      message: 'suceess',
      data: {
        title: 'fk.awbfjsbfbakbfe.kjna,.jbf.kbawkejbfjlabwfk'
      }
    };
  }
}