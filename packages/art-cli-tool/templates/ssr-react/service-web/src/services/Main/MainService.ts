import { Request } from 'express';
import { aggregator } from '../aggregator';

export default class MainService {
  public async requestRender(req: Request) {
    console.log('req.url: ', req.url);
    const jobs = {
      Main: {
        name: 'Main',
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