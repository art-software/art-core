import { Controller, Get, Req, Res } from 'routing-controllers';
import { ProductService } from '../../services/product/ProductService';
import { Request, Response } from 'express';

@Controller()
export default class ProductController {

  @Get('/product/*')
  public async home(@Req() req: Request, @Res() res: Response) {
    const productService = new ProductService();
    const html = await productService.requestRenderProduct(req);
    const renderedHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        ${html}
        <script type="text/javascript" src="http://me.dev.com:3005/static/art_framework.20180901.js"></script>
        <script type="text/javascript" src="http://me.dev.com:3001/public/demo/ssr/react/product/bundle.js"></script>
      </body>
      </html>
    `;

    return res.send(renderedHtml);
  }

  // @Get('/about')
  // public async about(@Req() req: Request, @Res() res: Response) {
  //   const homeService = new HomeService();
  //   const html = await homeService.requestRenderAbout();
  //   const renderedHtml = `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //       <title>Document</title>
  //     </head>
  //     <body>
  //       ${html}
  //       <script type="text/javascript" src="http://me.dev.com:3001/static/art_framework.20180901.js"></script>
  //       <script type="text/javascript" src="http://me.dev.com:3000/public/demo/ssr/react/home/bundle.js"></script>
  //     </body>
  //     </html>
  //   `;

  //   return res.send(renderedHtml);
  // }
}