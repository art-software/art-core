import { aggregator } from '../BaseRenderWebApi';
import { Request } from 'express';

export class HomeService {
  public requestRenderHome(req: Request) {
    const jobs = {
      Home: {
        name: 'Home',
        data: {
          url: req.url
        }
      }
    };
    return aggregator.render(jobs).then((result) => {
      console.log('result: ', result);
      return result;
    });
  }
}