import { Controller, Get, Req, Res } from 'routing-controllers';
import { HomeService } from '../../services/home/HomeService';
import { Request, Response } from 'express';

@Controller()
export default class HomeController {

  @Get('/home')
  @Get('/about')
  @Get('/mine')
  public async home(@Req() req: Request, @Res() res: Response) {
    const homeService = new HomeService();
    const html = await homeService.requestRenderHome(req);
    const renderedHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="http://me.dev.com:3005/public/demo/ssr/react/home/bundle.css">
      </head>
      <body>
        ${html}
        <script type="text/javascript" src="http://me.dev.com:3006/static/art_framework.20180901.js"></script>
        <script type="text/javascript" src="http://me.dev.com:3005/public/demo/ssr/react/home/bundle.js"></script>
      </body>
      </html>
    `;

    return res.send(renderedHtml);
  }
}