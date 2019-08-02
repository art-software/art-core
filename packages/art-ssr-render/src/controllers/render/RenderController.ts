import { Controller, Post, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';
import { ServerConfig } from '../../config/ServerConfig';

@Controller()
export class RenderController {

  @Post(ServerConfig.get().endpoint)
  public render(@Req() req: Request, @Res() res: Response) {
    return res.json({
      name: 'bw'
    });
  }
}