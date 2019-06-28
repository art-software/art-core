import { baseRenderWebApi } from '../BaseRenderWebApi';

export class HomeService {
  public requestRender() {
    return baseRenderWebApi.requestPost('/batch', {
      data: {
        Home: {
          name: 'Home',
          data: {}
        }
      }
    }).then((result) => {
      if (!result) { return {}; }
      return result.data && result.data.results.Home;
    });
  }
}