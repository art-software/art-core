import { aggregator } from '../BaseRenderWebApi';
import { Request } from 'express';

export class ProductService {
  public requestRenderProduct(req: Request) {
    const jobs = {
      Product: {
        name: 'Product',
        data: {
          url: req.url
        }
      }
    };
    return aggregator.render(jobs).then((result) => {
      return result;
    });
  }
}