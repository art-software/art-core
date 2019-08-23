import { Controller, Post, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';
import { ServerConfig } from '../../config/ServerConfig';
import BatchRenderService from '../../services/BatchRenderService';
import { processBatch } from './processBatch';

@Controller()
export class RenderController {

  @Post(ServerConfig.get().endpoint)
  public render(@Req() req: Request, @Res() res: Response) {
    console.log('req.body: ', req.body);

    // TODO
    // if (isClosing()) {
    //   Logger.info('Starting request when closing!');
    // }

    const serverConfig = ServerConfig.get();
    const batchRenderService = new BatchRenderService(req, res, serverConfig);

    return processBatch(req.body, serverConfig.plugins, batchRenderService, serverConfig.processJobsConcurrent)
      .then(() => {
        // TODO
        // if (isClosing()) {
        //   Logger.info('Ending request when closing!');
        // }

        return res.status(batchRenderService.statusCode)
          .json(batchRenderService.getResults());
      })
      .catch(() => {
        res.status(batchRenderService.statusCode).end();
      });
  }
}