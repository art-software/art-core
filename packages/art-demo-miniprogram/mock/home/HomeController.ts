import { Controller, Get } from 'routing-controllers';

@Controller()
export default class TabHomeController {

  @Get('/demo/get')
  public portalGet() {

    return {
      success: true,
      code: '0000',
      message: 'success',
      data: {
        name: 'Tom'
      }
    };
  }
}