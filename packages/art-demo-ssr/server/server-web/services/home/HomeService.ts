import { baseRenderWebApi } from '../BaseRenderWebApi';

export class HomeService {
  public requestRenderHome() {
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

  public requestRenderAbout() {
    return baseRenderWebApi.requestPost('/batch', {
      data: {
        About: {
          name: 'About',
          data: {}
        }
      }
    }).then((result) => {
      if (!result) { return {}; }
      return result.data && result.data.results.About;
    });
  }
}